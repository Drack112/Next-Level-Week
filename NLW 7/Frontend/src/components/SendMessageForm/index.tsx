import { FormEvent, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import styles from "./style.module.scss";

export function SendMessageForm() {
	const { user, singOut } = useAuth();
	const [message, setMessage] = useState("");

	async function handleSendMessage(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!message.trim()) return;
		await api.post("message", { message });
		setMessage("");
	}

	return (
		<div className={styles.sendMessageFormWrapper}>
			<button className={styles.singOutButton} onClick={singOut}>
				<VscSignOut size="32" />
			</button>
			<header className={styles.userIformation}>
				<div className={styles.userImage}>
					<img src={user?.avatar_url} alt={user?.name} />
				</div>
				<strong className={styles.userName}>{user?.name}</strong>
				<span className={styles.userGithub}>
					<VscGithubInverted size="16" />
					{user?.login}
				</span>

				<form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
					<label htmlFor="message">Menssagem</label>
					<textarea
						name="message"
						id="message"
						placeholder="Qual sua expectativa para o evento"
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					/>
					<button type="submit">Enviar menssagem</button>
				</form>
			</header>
		</div>
	);
}
