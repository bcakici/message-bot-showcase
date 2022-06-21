import { useState } from "react";
import useSendMessageMutation from "../hooks/useSendMessageMutation";

export interface Properties {
	messageBoxID: string;
}

export default function MessageView(props: Properties) {
	const sendMessageMutation = useSendMessageMutation(props.messageBoxID);
	const [text, setText] = useState("");
	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			// if any meta key is pressed it will send as market owner
			sendMessageMutation.mutate({
				text,
				isCustomer:
					!event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey,
			});
			setText("");
		}
	};

	return (
		<input
			className="bg-white text-gray-900 rounded-b-xl px-10 py-[2rem] w-full min-h-[6rem] max-h-[10rem] break-words"
			type="text"
			value={text}
			placeholder="Send with Enter or Alt+Enter (Customer or Business)"
			onChange={(e) => setText(e.target.value)}
			onKeyDown={(e) => onKeyDown(e)}
		/>
	);
}
