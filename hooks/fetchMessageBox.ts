import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useQuery } from "react-query";

const fetchWithConfiguration = (messageBoxID: string) =>
	fetch("http://localhost:3003/messageBox", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			messageBox: messageBoxID,
		}),
	});

export default (messageBoxID: string) =>
	useQuery(
		["messageBoxUseQuery", messageBoxID],
		async ({ queryKey }) => {
			const [key, messageBoxID] = queryKey;
			const res = await fetchWithConfiguration(messageBoxID);
			const jsonResult = await res.json();
			return jsonResult;
		},
		{
			refetchInterval: 750,
		}
	);
