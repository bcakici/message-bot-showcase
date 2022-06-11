import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import { Message } from "../pages";

export default (
	messageBoxID: string,
	setMessages: Dispatch<SetStateAction<Message[]>>
) =>
	useEffect(() => {
		const fetchMessageBoxID = () => {
			if (messageBoxID !== "") {
				fetch("http://localhost:3003/messageBox", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						messageBox: messageBoxID,
					}),
				})
					.then((resp) => {
						return resp.json();
					})
					.then((fetchedMessages) => {
						setMessages(fetchedMessages as Message[]);
					});
			}
		};
		fetchMessageBoxID();
		const interval = setInterval(() => {
			fetchMessageBoxID();
		}, 750);

		return () => clearInterval(interval);
	}, [messageBoxID]);
