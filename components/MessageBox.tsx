import classnames from "classnames";
import useMessageBoxQuery from "../hooks/useMessageBoxQuery";
import Message from "../types/Message";

export interface Properties {
	messageBoxID: string;
}

export default function MessageView(props: Properties) {
	const { data, failureCount, isFetching, refetch } = useMessageBoxQuery(
		props.messageBoxID
	);

	return (
		<div className="flex flex-col gap-5 justify-end content-end grow-1 bg-blue-300 text-gray-900 rounded-t-xl p-10 mx-auto w-full min-h-[30rem] max-h-[30rem] lg:min-h-[40rem] lg:max-h-[40rem] overflow-clip">
			{data?.map((message: Message) => (
				<div
					key={message.id}
					className={classnames({
						"space-y-2 p-5 rounded-2xl": true,
						"animate__animated animate__faster": true,
						"animate__fadeInBottomRight bg-yellow-100 rounded-br-none place-self-end":
							message.isCustomer,
						"animate__fadeInBottomLeft rounded-bl-none place-self-start":
							!message.isCustomer,
						"bg-white": !message.isCustomer && !message.isBot,
						"bg-violet-900 text-white": !message.isCustomer && message.isBot,
					})}
				>
					{message.text}
				</div>
			))}
			{failureCount > 0 && (
				<div className="p-10 rounded-2xl text-white bg-gray-700 text-center text-xl shadow-lg">
					<p className="font-bold ">Can't connect to server</p>

					{isFetching ? (
						<p className="text-sm mt-5 text-gray-400">Loading...</p>
					) : (
						<p
							className="text-sm cursor-pointer p-6 shadow-lg border-1 bg-red-500 hover:bg-red-800 rounded-2xl max-w-fit mt-8 mx-auto"
							onClick={() => refetch()}
						>
							Click to try again
						</p>
					)}
				</div>
			)}
		</div>
	);
}
