import classnames from "classnames";
import { useLayoutEffect, useRef } from "react";
import useMessageBoxQuery from "../hooks/useMessageBoxQuery";
import Message from "../types/Message";

export interface Properties {
	messageBoxID: string;
}

export default function MessageView(props: Properties) {
	const { data, failureCount, isFetching, refetch } = useMessageBoxQuery(
		props.messageBoxID
	);

	// to scroll to bottom on new message
	const messageScroller = useRef<null | HTMLDivElement>(null);
	useLayoutEffect(() => {
		messageScroller.current?.scroll(
			0,
			messageScroller.current?.scrollHeight + 30
		);
	}, [data]);

	return (
		<>
			<div className="flex justify-center items-center rounded-t-xl text-xl bg-gray-900 text-center min-h-[4rem]">
				<div>{data?.customer}</div>
			</div>
			<div
				ref={messageScroller}
				className="flex flex-col gap-5 content-end grow-1 bg-blue-300 text-gray-900 p-10 mx-auto w-full min-h-[30rem] max-h-[30rem] lg:min-h-[40rem] lg:max-h-[40rem] overflow-x-clip overflow-y-auto scroll-smooth"
				id="messages"
			>
				{data?.messages.map((message: Message, i: number) => (
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
				{(failureCount > 0 && (
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
				)) ||
					(data?.messages.length === 0 && (
						<p className="text-sm text-gray-600 text-center my-10">
							This message box is empty. Say something.
						</p>
					))}
			</div>
		</>
	);
}
