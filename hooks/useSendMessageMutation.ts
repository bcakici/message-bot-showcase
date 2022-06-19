import { useState } from "react";
import Message from "../types/Message";
import { useMutation, useQueryClient } from "react-query";
import { EventEmitter } from "stream";

export default (messageBoxID: string) => {
	const generateMessage = (
		messageBoxID: string,
		messageText: string
	): Message => ({
		text: messageText,
		date: new Date().toISOString(),
		isCustomer: true,
		isBot: false,
		messageBox: messageBoxID,
	});

	const fetchWithConfiguration = (message: Message) =>
		fetch("http://localhost:3003/messageListener", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});

	const queryClient = useQueryClient();

	return useMutation(
		(messageText: string) => {
			return fetchWithConfiguration(generateMessage(messageBoxID, messageText));
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("messageBox");
			},
		}
	);
};
