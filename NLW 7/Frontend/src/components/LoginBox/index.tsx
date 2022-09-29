import styles from "./style.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import { useAuth } from "../../hooks/useAuth";

export function LoginBox() {
	const { signInUrl } = useAuth();
	return (
		<div className={styles.loginBoxWrapper}>
			<strong>Entre e compartilhe sua menssagem</strong>
			<a href={signInUrl} className={styles.signInWithGithub}>
				<VscGithubInverted size="24" />
				Entrar com Github
			</a>
		</div>
	);
}
