import { useQuery } from "react-query";

export default () => {
	const fetchWithConfiguration = () =>
		fetch(`http://localhost:3003/dashboard`, {
			method: "GET",
		});

	return useQuery(
		["dashboard"],
		async () => {
			const res = await fetchWithConfiguration();
			const jsonResult = await res.json();
			return jsonResult;
		},
		{
			refetchInterval: 750,
		}
	);
};
