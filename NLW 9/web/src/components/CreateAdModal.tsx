import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {
	ArrowsVertical,
	Check,
	CircleNotch,
	GameController,
} from 'phosphor-react';
import { Combobox, Transition } from '@headlessui/react';
import Input from './Form/Input';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { IGame } from '../interfaces/game';
import axios from 'axios';
import { Ad } from '../interfaces/ad';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CreateAdModalProps {
	games: IGame[];
	onCloseModal: (created: boolean) => void;
}

export default function CreateAdModal({
	games,
	onCloseModal,
}: CreateAdModalProps) {
	const [selectedGame, setSelectedGame] = useState<IGame | undefined>(undefined);
	const [query, setQuery] = useState('');
	const [isCreatingAd, setIsCreatingAd] = useState<boolean>(false);

	const filteredGames =
		query == ''
			? games
			: games.filter((game) =>
					game.title.toLowerCase().includes(query.toLowerCase())
			  );

	const formik = useFormik({
		initialValues: {
			gameId: '',
			name: '',
			yearsPlaying: 0,
			discord: '',
			weekDays: [''],
			hoursStart: '',
			hoursEnd: '',
			useVoiceChannel: false,
		},
		validationSchema: Yup.object({
			gameId: Yup.string().required('Selecione o game'),
			name: Yup.string().required('Informe o seu nome (ou nickname)'),
			yearsPlaying: Yup.number().required('Informe há quantos anos você joga'),
			discord: Yup.string().required('Informe o seu Discord'),
			weekDays: Yup.array().min(1, 'Selecione pelo menos um dia da semana'),
			hoursStart: Yup.string().required('Informe o horário do dia'),
			hoursEnd: Yup.string().required('Informe o horário do dia'),
			useVoiceChannel: Yup.boolean(),
		}),
		validate: (values) => {
			let errors: any = {};
			if (values.weekDays.length == 1 && formik.values.weekDays[0] == '')
				errors.weekDays = 'Selecione pelo menos um dia da semana';
			else delete errors.weekDays;

			return errors;
		},
		onSubmit: async (values) => {
			setIsCreatingAd(true);
			console.log(values);
			try {
				await axios.post<Ad>(`http://localhost:3333/games/${values.gameId}/ads`, {
					name: values.name,
					yearsPlaying: Number(values.yearsPlaying),
					discord: values.discord,
					weekDays: values.weekDays.map(Number),
					hoursStart: values.hoursStart,
					hoursEnd: values.hoursEnd,
					useVoiceChannel: values.useVoiceChannel,
				});
				setIsCreatingAd(false);
				toast.success('Anúncio criado com sucesso!');
				handleCloseModal(true);
			} catch (error) {
				setIsCreatingAd(false);
				toast.error('Erro ao criar anúncio');
			}
		},
	});

	function handleCloseModal(created: boolean = false) {
		setSelectedGame(undefined);
		onCloseModal(created);
		formik.resetForm();
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay className='bg-black/60 inset-0 fixed overflow-y-auto' />
			<Dialog.Content
				onInteractOutside={() => handleCloseModal(false)}
				onCloseAutoFocus={() => handleCloseModal(false)}
				className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[90vw] max-w-[520px] max-h-[90vh] xxs:max-h-[80vh] xs:max-h-[80vh] md:max-h-[80vh] lg:max-h-[80vh] xl:max-h-[80vh]shadow-lg shadow-black/25 animate-fade-in overflow-auto'>
				<Dialog.Title className='text-3xl font-black'>
					Publique um anúncio
				</Dialog.Title>
				<form onSubmit={formik.handleSubmit} className='mt-8 flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<label htmlFor='game' className='font-semibold'>
							Qual o game?
						</label>

						<Combobox
							onChange={(game: IGame) => {
								formik.setFieldValue('gameId', game.id);
							}}
							value={selectedGame}
							name='gameId'>
							<div className='relative mt-1'>
								<div className='relative cursor-default overflow-hidden bg-zinc-900 rounded-lg text-sm placeholder:text-zinc-500 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
									<Combobox.Input
										className='w-full bg-zinc-900 py-3 px-4 rounded-lg text-sm placeholder:text-zinc-500 focus:ring-0'
										displayValue={(game: IGame) =>
											game ? game.title : 'Selecione o game'
										}
										onChange={(event) => setQuery(event.target.value)}
									/>
									<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
										<ArrowsVertical
											size={32}
											className='h-5 w-5 text-gray-400'
											aria-hidden='true'
										/>
									</Combobox.Button>
								</div>
								<Transition
									as={Fragment}
									leave='transition ease-in duration-100'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'
									afterLeave={() => setQuery('')}>
									<Combobox.Options
										className='absolute mt-1 max-h-72
                   w-full overflow-auto rounded-md bg-zinc-900 text-zinc-500 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
										{filteredGames.length === 0 ? (
											<div className='relative cursor-default select-none py-2 px-4 text-zinc-500'>
												Nenhum game encontrado
											</div>
										) : (
											<>
												<Combobox.Option
													className={({ active }) =>
														`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
															active ? 'bg-violet-500 text-white' : 'text-zinc-400'
														}`
													}
													value=''>
													Selecione o game
												</Combobox.Option>
												{filteredGames.map((game) => (
													<Combobox.Option
														key={game.id}
														className={({ active }) =>
															`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
																active ? 'bg-violet-500 text-white' : 'text-zinc-200'
															}`
														}
														value={game}>
														{({ selected, active }) => (
															<>
																<div className='flex items-center gap-6'>
																	<img src={game.bannerUrl} alt='' className='h-12 rounded' />
																	<span
																		className={`block truncate ${
																			selected ? 'font-medium' : 'font-normal'
																		}`}>
																		{game.title}
																	</span>
																</div>
																{selected ? (
																	<span
																		className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																			active ? 'text-white' : 'text-emerald-400'
																		}`}>
																		<Check className='h-5 w-5' aria-hidden='true' />
																	</span>
																) : null}
															</>
														)}
													</Combobox.Option>
												))}
											</>
										)}
									</Combobox.Options>
								</Transition>
							</div>
						</Combobox>
						{formik.touched.gameId && formik.errors.gameId ? (
							<span className='text-xs text-red-400'>{formik.errors.gameId}</span>
						) : null}
					</div>

					<div className='flex flex-col gap-2'>
						<label htmlFor='name' className='font-semibold'>
							Seu nome (ou nickname)
						</label>
						<Input
							name='name'
							id='name'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
							placeholder='Como te chamam dentro do game?'
						/>
						{formik.touched.name && formik.errors.name ? (
							<span className='text-xs text-red-400'>{formik.errors.name}</span>
						) : null}
					</div>

					<div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='yearsPlaying' className='font-semibold'>
								Joga há quantos anos?
							</label>
							<Input
								name='yearsPlaying'
								id='yearsPlaying'
								type='number'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.yearsPlaying}
								placeholder='Tudo bem ser ZERO'
							/>
							{formik.touched.yearsPlaying && formik.errors.yearsPlaying ? (
								<span className='text-xs text-red-400'>
									{formik.errors.yearsPlaying}
								</span>
							) : null}
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='discord' className='font-semibold'>
								Qual seu Discord?
							</label>
							<Input
								name='discord'
								id='discord'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.discord}
								placeholder='Usuario#0000'
							/>
							{formik.touched.discord && formik.errors.discord ? (
								<span className='text-xs text-red-400'>{formik.errors.discord}</span>
							) : null}
						</div>
					</div>

					<div className='flex flex-col xxs:flex-row xs-flex-row sm-flex-row md-flex-row lg-flex-row gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='weekDays' className='font-semibold'>
								Quando costuma jogar?
							</label>

							<ToggleGroup.Root
								type='multiple'
								className='grid grid-cols-7 xxs:grid-cols-4 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl;grid-cols-4 gap-2'
								value={formik.values.weekDays}
								onValueChange={(weekDays) => {
									formik.setFieldValue('weekDays', weekDays);
								}}>
								<ToggleGroup.Item
									value='0'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										formik.values.weekDays.includes('0')
											? 'bg-violet-500'
											: 'bg-zinc-900 '
									}`}
									title='Domingo'>
									D
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='1'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										formik.values.weekDays.includes('1')
											? 'bg-violet-500'
											: 'bg-zinc-900 '
									}`}
									title='Segunda'>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='2'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										formik.values.weekDays.includes('2')
											? 'bg-violet-500'
											: 'bg-zinc-900 '
									}`}
									title='Terça'>
									T
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='3'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										formik.values.weekDays.includes('3')
											? 'bg-violet-500'
											: 'bg-zinc-900 '
									}`}
									title='Quarta'>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='4'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										formik.values.weekDays.includes('4')
											? 'bg-violet-500'
											: 'bg-zinc-900 '
									}`}
									title='Quinta'>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='5'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										formik.values.weekDays.includes('5')
											? 'bg-violet-500'
											: 'bg-zinc-900 '
									}`}
									title='Sexta'>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='6'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										formik.values.weekDays.includes('6')
											? 'bg-violet-500'
											: 'bg-zinc-900 '
									}`}
									title='Sábado'>
									S
								</ToggleGroup.Item>
							</ToggleGroup.Root>
							{formik.touched.weekDays && formik.errors.weekDays ? (
								<span className='text-xs text-red-400'>{formik.errors.weekDays}</span>
							) : null}
						</div>

						<div className='flex flex-col gap-2 flex-1'>
							<label htmlFor='hoursStart' className='font-semibold'>
								Qual horário do dia?
							</label>
							<div className='grid grid-cols-2 gap-2'>
								<Input
									name='hoursStart'
									id='hoursStart'
									type='time'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.hoursStart}
									placeholder='De'
								/>
								<Input
									name='hoursEnd'
									id='hoursEnd'
									type='time'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.hoursEnd}
									placeholder='Até'
								/>
							</div>
							{(formik.touched.hoursStart || formik.touched.hoursEnd) &&
							(formik.errors.hoursStart || formik.errors.hoursEnd) ? (
								<span className='text-xs text-red-400'>
									{formik.errors.hoursStart
										? formik.errors.hoursStart
										: formik.errors.hoursEnd && formik.errors.hoursEnd}
								</span>
							) : null}
						</div>
					</div>

					<div className='mt-2 flex items-center gap-2 text-sm '>
						<Checkbox.Root
							className='w-6 h-6 p-1 rounded bg-zinc-900'
							id='voiceChat'
							name='useVoiceChannel'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							checked={formik.values.useVoiceChannel}
							onCheckedChange={(checked) => {
								if (checked == true) formik.setFieldValue('useVoiceChannel', true);
								else formik.setFieldValue('useVoiceChannel', false);
							}}>
							<Checkbox.Indicator>
								<Check className='w-4 h-4 text-emerald-400' />
							</Checkbox.Indicator>
						</Checkbox.Root>
						<label className='cursor-pointer' htmlFor='voiceChat'>
							Costumo me conectar ao chat de voz
						</label>
					</div>

					<footer className='mt-4 flex-col xxs:flex-row xs-flex-row sm-flex-row md-flex-row lg-flex-row flex gap-4 justify-end'>
						<Dialog.Close
							onClick={() => handleCloseModal(false)}
							type='button'
							className='bg-zinc-500 rounded-md px-5 h-12 flex items-center justify-center ripple-bg-zinc-400'>
							Cancelar
						</Dialog.Close>
						<button
							type='submit'
							disabled={isCreatingAd}
							className={`bg-violet-500 rounded-md px-5 h-12 flex items-center justify-center gap-3 ${
								isCreatingAd ? 'disabled:text-zinc-300' : 'ripple-bg-violet-600'
							}`}>
							{isCreatingAd ? (
								<>
									<CircleNotch size={24} className='animate-spin' />
									Enviando...
								</>
							) : (
								<>
									<GameController size={24} />
									Encontrar duo
								</>
							)}
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
