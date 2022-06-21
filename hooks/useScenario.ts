import { useCallback, useEffect, useState } from "react";
import Message from "../types/Message";
import { v4 as uuidv4 } from "uuid";
import scenarios from "../data/scenarios.json";
import { useQuery } from "react-query";

export default function useScenario() {
	const [scenario, setScenario] = useState<Message[]>([]);
	const [messageBoxID, setMessageBoxID] = useState("");
	const [scenarioEnabled, setScenarioEnabled] = useState(true);

	const goBackToMessageBox = useCallback((messageBoxID: string) => {
		console.log("setting message box to ", messageBoxID);
		setScenarioEnabled(false);
		setMessageBoxID(messageBoxID);
	}, []);

	const setNewScenario = useCallback((newScenario: string) => {
		setScenarioEnabled(false);
		setMessageBoxID(uuidv4());
		setScenario(scenarios[newScenario] as Message[]);
		setScenarioEnabled(true);
	}, []);

	const generateMessage = (message: Message): Message => ({
		text: message.text,
		date: new Date().toISOString(),
		isCustomer: message.isCustomer,
		isBot: false,
		messageBox: messageBoxID,
	});

	const fetchWithConfiguration = (
		message: Message,
		signal: AbortSignal | undefined
	) =>
		fetch("http://localhost:3003/messageListener", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(generateMessage(message)),
			signal,
		});

	useQuery(
		["messageListener"],
		async ({ signal }) => {
			const message = scenario[0];
			if (message) {
				setScenario((scenario) => scenario.slice(1));
				const res = await fetchWithConfiguration(message, signal);
				const jsonResult = await res.json();
				return jsonResult;
			} else {
				setScenarioEnabled(false);
			}
		},
		{
			refetchInterval: 1500,
			enabled: scenarioEnabled,
		}
	);

	return { messageBoxID, setNewScenario, goBackToMessageBox };
}
