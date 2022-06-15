import classnames from "classnames";
import { useState } from "react";
import { Message } from "../pages";
import useMessageBoxQuery from "../hooks/useMessageBoxQuery";

export interface Properties {
	messageBoxID: string;
}

export default function MessageView(props: Properties) {
	const { data } = useMessageBoxQuery(props.messageBoxID);

	return (
		<div className="flex flex-col gap-5 justify-end content-end grow-1 bg-blue-300 text-gray-900 rounded-xl p-10 mx-auto h-full w-full max-w-lg lg:max-w-full">
			{data?.map((message: Message) => (
				<div
					key={message.id}
					className={classnames({
						"space-y-2 p-5 rounded-2xl": true,
						"bg-yellow-100 rounded-tr-none place-self-end": message.isCustomer,
						"bg-white rounded-tl-none place-self-start": !message.isCustomer,
					})}
				>
					{message.text}
				</div>
			))}
		</div>
	);
}
