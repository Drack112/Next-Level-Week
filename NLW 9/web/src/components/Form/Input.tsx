import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
	return (
		<input
			{...props}
			className='bg-zinc-900 py-3 px-4 rounded-lg text-sm placeholder:text-zinc-500 ring-offset-violet-500'
		/>
	);
}
