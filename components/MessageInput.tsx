import { useState } from "react";
import useSendMessageMutation from "../hooks/useSendMessageMutation";

export interface Properties {
	messageBoxID: string;
}

export default function MessageView(props: Properties) {
	const sendMessageMutation = useSendMessageMutation(props.messageBoxID);
	const [text, setText] = useState("");
	const onEnter = () => {
		{
			sendMessageMutation.mutate(text);
			setText("");
		}
	};

	return (
		<input
			className="bg-white text-gray-900 rounded-b-xl px-10 py-[2rem] w-full min-h-[6rem] max-h-[10rem]"
			type="text"
			value={text}
			onChange={(e) => setText(e.target.value)}
			onKeyDown={(e) => e.key === "Enter" && onEnter()}
		/>
	);
}
