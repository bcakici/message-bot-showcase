import { useCallback, useEffect, useState } from "react";
import { Message } from "../pages";
import { v4 as uuidv4 } from "uuid";
import scenarios from "../data/scenarios.json";

export default function useScenario() {
	const [scenario, setScenario] = useState<Message[]>([]);
	const [messageBoxID, setMessageBoxID] = useState("");

	const setNewScenario = useCallback((newScenario: string) => {
		const _messageBoxId = uuidv4();
		setMessageBoxID(_messageBoxId);
		setScenario(scenarios[newScenario] as Message[]);
	}, []);

	useEffect(() => {
		let interval: NodeJS.Timer;
		const sendNextMessage = () => {
			setScenario((scenario) => {
				const message = scenario[0];
				if (message) {
					fetch("http://localhost:3003/receiveMessage", {
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
					});
				} else {
					clearInterval(interval);
				}
				return scenario.slice(1);
			});
		};
		sendNextMessage();
		interval = setInterval(() => {
			sendNextMessage();
		}, 1500);
		return () => {
			clearInterval(interval);
		};
	}, [messageBoxID]);

	return { messageBoxID, setNewScenario };
}
