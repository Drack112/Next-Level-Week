import { createContext, ReactNode, useState } from "react";
import { useEffect } from "react";
import { api } from "../services/api";

type User = {
	id: string;
	name: string;
	login: string;
	avatar_url: string;
};

type AuthContextData = {
	user: User | null;
	signInUrl: string;
	singOut: () => void;
};

type AuthResponse = {
	token: string;
	user: {
		id: string;
		avatar_url: string;
		name: string;
		login: string;
	};
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
	children: ReactNode;
};

export function AuthProvider(props: AuthProvider) {
	const [user, setUser] = useState<User | null>(null);
	const signInWithGithubURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${
		import.meta.env.VITE_GITHUB_CLIENT_ID
	}`;
	function singOut() {
		setUser(null);
		localStorage.clear();
	}

	async function signIn(code: string) {
		const client = import.meta.env.VITE_GITHUB_CLIENT_ID;
		const secret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
		const { data } = await api.post<AuthResponse>("authenticate", {
			code,
			client,
			secret,
		});
		const { token, user } = data;
		localStorage.setItem("DoWhileToken", token);

		api.defaults.headers.common.authorization = `Bearer ${token}`;

		setUser(user);
	}

	useEffect(() => {
		const token = localStorage.getItem("DoWhileToken");
		async function getUser() {
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			const { data } = await api.get<User>("profile");
			setUser(data);
		}

		if (token) getUser();
	}, []);

	useEffect(() => {
		const url = window.location.href;
		const hasGithubCode = url.includes("?code=");
		if (hasGithubCode) {
			const [urlWithoutCode, githubCode] = url.split("?code=");
			window.history.pushState({}, "", urlWithoutCode);
			signIn(githubCode);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ signInUrl: signInWithGithubURL, user, singOut }}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
