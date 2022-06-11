import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Message } from "../pages";
import { v4 as uuidv4 } from "uuid";

export default function runScenario(
	setMessageBoxID: Dispatch<SetStateAction<string>>
) {
	const [scenario, setScenario] = useState<Message[]>([]);

	return useCallback((newScenario: Message[]) => {
		const _messageBoxID = uuidv4();
		setMessageBoxID(_messageBoxID);
		let interval: NodeJS.Timer;
		setScenario(newScenario);

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
							messageBox: _messageBoxID,
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
		return () => clearInterval(interval);
	}, []);
}
