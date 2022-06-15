import { useCallback, useEffect, useState } from "react";
import { Message } from "../pages";
import { v4 as uuidv4 } from "uuid";
import scenarios from "../data/scenarios.json";
import { useQuery, useQueryClient } from "react-query";

export default function useScenario() {
	const [scenario, setScenario] = useState<Message[]>([]);
	const [messageBoxID, setMessageBoxID] = useState("");
	const [enabled, setEnabled] = useState(true);

	const setNewScenario = useCallback((newScenario: string) => {
		setMessageBoxID(uuidv4());
		setScenario(scenarios[newScenario] as Message[]);
	}, []);

	const queryClient = useQueryClient();

	const fetchWithConfiguration = (
		message: Message,
		signal: AbortSignal | undefined
	) =>
		fetch("http://localhost:3003/messageListener", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				customerID: 1,
				text: message.text,
				date: new Date().toISOString(),
				isCustomer: message.isCustomer,
				isBot: false,
				messageBox: messageBoxID,
			}),
			signal,
		});

	useQuery(
		["messageListener"],
		async ({ queryKey, signal }) => {
			const message = scenario[0];
			if (message) {
				setScenario((scenario) => scenario.slice(1));
				const res = await fetchWithConfiguration(message, signal);
				const jsonResult = await res.json();
				return jsonResult;
			} else {
				setEnabled(false);
			}
		},
		{
			refetchInterval: 1500,
			enabled,
		}
	);

	useEffect(() => {
		setEnabled(true);
	}, [messageBoxID]);

	return { messageBoxID, setNewScenario };
}
