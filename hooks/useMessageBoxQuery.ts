import { useQuery } from "react-query";

export default (messageBoxID: string) => {
	const fetchWithConfiguration = (messageBoxID: string) =>
		fetch(`http://localhost:3003/messages/${messageBoxID}`, {
			method: "GET",
		});

	return useQuery(
		["messageBox", messageBoxID],
		async ({ queryKey }) => {
			const [key, messageBoxID] = queryKey;
			if (!messageBoxID) return;
			const res = await fetchWithConfiguration(messageBoxID);
			const jsonResult = await res.json();
			return jsonResult;
		},
		{
			refetchInterval: 750,
		}
	);
};
