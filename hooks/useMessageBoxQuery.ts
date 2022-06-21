import { useState } from "react";
import { useQuery } from "react-query";

export default (messageBoxID: string) => {
	const [refetchInterval, setRefetchInterval] = useState<number | false>(750);
	const fetchWithConfiguration = (messageBoxID: string) =>
		fetch(`http://localhost:3003/messages/${messageBoxID}`, {
			method: "GET",
		});

	const keys = useQuery(
		["messageBox", messageBoxID],
		async ({ queryKey }) => {
			const [key, messageBoxID] = queryKey;
			if (!messageBoxID) return;
			const res = await fetchWithConfiguration(messageBoxID);
			const jsonResult = await res.json();
			return jsonResult;
		},
		{
			refetchOnWindowFocus: false,
			refetchInterval,
		}
	);

	if (keys.failureCount > 0 && refetchInterval !== false) {
		setRefetchInterval(false);
	} else if (keys.failureCount === 0 && refetchInterval === false) {
		setRefetchInterval(750);
	}

	return keys;
};
