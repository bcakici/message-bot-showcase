import { useState } from "react";
import Message from "../types/Message";
import { useMutation, useQueryClient } from "react-query";
import { EventEmitter } from "stream";

export default (messageBoxID: string) => {
	const generateMessage = (
		messageBoxID: string,
		messageText: string,
		isCustomer: boolean = true
	): Message => ({
		text: messageText,
		date: new Date().toISOString(),
		isCustomer,
		isBot: false,
		messageBox: messageBoxID,
	});

	const fetchWithConfiguration = (message: Message) =>
		fetch(`${process.env.NEXT_PUBLIC_SERVER}/messageListener`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});

	const queryClient = useQueryClient();

	return useMutation(
		(semiMessage: Message) => {
			return fetchWithConfiguration(
				generateMessage(messageBoxID, semiMessage.text, semiMessage.isCustomer)
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("messageBox");
			},
		}
	);
};
