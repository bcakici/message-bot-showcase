import classnames from "classnames";
import useMessageBoxQuery from "../hooks/useMessageBoxQuery";
import Message from "../types/Message";

export interface Properties {
	messageBoxID: string;
}

export default function MessageView(props: Properties) {
	const { data } = useMessageBoxQuery(props.messageBoxID);

	return (
		<div className="flex flex-col gap-5 justify-end content-end grow-1 bg-blue-300 text-gray-900 rounded-xl p-10 mx-auto w-full max-w-lg lg:max-w-full h-[40rem] lg:min-h-0 lg:h-full overflow-clip">
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
		</div>
	);
}
