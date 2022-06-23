import { useMutation, useQueryClient } from "react-query";

export default () => {
	const fetchWithConfiguration = (messageBoxID: string) =>
		fetch(
			`${process.env.NEXT_PUBLIC_SERVER}/completeTransaction/${messageBoxID}`,
			{
				method: "GET",
			}
		);

	const queryClient = useQueryClient();

	return useMutation(
		(messageBoxID: string) => {
			return fetchWithConfiguration(messageBoxID);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("dashboard");
			},
		}
	);
};
