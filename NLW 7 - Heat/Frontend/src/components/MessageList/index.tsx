import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { api } from "../../services/api";

import logoImg from "../../assets/logo.svg";

import styles from "./style.module.scss";

interface Message {
	id: string;
	text: string;
	user: {
		name: string;
		avatar_url: string;
	};
}

const messageQueue: Message[] = [];
const url = import.meta.env.VITE_PRODUTION_URL;
const socket = io(typeof url === "string" ? url : "http://localhost:8000");
socket.on("new_message", (message: Message) => {
	if (message) messageQueue.push(message);
});

export function MessageList() {
	const [messages, setMessages] = useState<Message[]>([]);
	useEffect(() => {
		setInterval(() => {
			if (messageQueue.length > 0) {
				setMessages((prevState) =>
					[messageQueue[0], prevState[0], prevState[1]].filter(Boolean),
				);
				messageQueue.shift();
			}
		}, 3000);
	}, []);
	useEffect(() => {
		async function loadMessages() {
			const { data } = await api.get<Message[]>("/message/last3");
			setMessages(data);
		}
		loadMessages();
	}, []);
	return (
		<div className={styles.messageListWrapper}>
			<img src={logoImg} alt="DoWhile 2021" />
			<ul className={styles.messageList}>
				{messages.map((message, index) => (
					<li className={styles.message} key={message.id + String(index)}>
						<p className={styles.messageItem}>{message.text}</p>
						<div className={styles.messageUser}>
							<div className={styles.userImage}>
								<img src={message.user.avatar_url} alt={message.user.name} />
							</div>
							<span>{message.user.name}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
