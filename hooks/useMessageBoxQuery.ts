import { useQuery } from "react-query";

export default (messageBoxID: string) => {
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

	return useQuery(
		["messageBox", messageBoxID],
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
};
