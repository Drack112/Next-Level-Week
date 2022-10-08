import React, { useState } from 'react';
import {
	Modal,
	ModalProps,
	Text,
	View,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from 'react-native-paper';

import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
	discord: string;
	onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
	const [isCopyingDiscord, setIsCopyingDiscord] = useState(false);
	const [isShowingSnackbar, setIsShowingSnackbar] = useState(false);

	async function handleCopyDiscordToClipboard() {
		setIsCopyingDiscord(true);
		await Clipboard.setStringAsync(discord);
		setTimeout(() => {
			setIsCopyingDiscord(false);
			setIsShowingSnackbar(true);
		}, 400);
	}

	return (
		<Modal animationType='fade' transparent statusBarTranslucent {...rest}>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity style={styles.closeIcon} onPress={onClose}>
						<MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
					</TouchableOpacity>

					<CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold' />

					<Heading
						title="Let's play!"
						subtitle='Agora é só começar a jogar!'
						style={{ alignItems: 'center', marginTop: 24 }}
					/>

					<Text style={styles.label}>Adicione no Discord</Text>

					<TouchableOpacity
						style={styles.discordButton}
						onPress={handleCopyDiscordToClipboard}
						disabled={isCopyingDiscord}>
						<Text style={styles.discord}>
							{isCopyingDiscord ? (
								<ActivityIndicator color={THEME.COLORS.PRIMARY} />
							) : (
								discord
							)}
						</Text>
					</TouchableOpacity>
				</View>
				<Snackbar
					visible={isShowingSnackbar}
					onDismiss={() => setIsShowingSnackbar(false)}
					action={{
						label: 'OK',
					}}
					wrapperStyle={{ position: 'absolute', bottom: 0 }}
					theme={{ colors: { accent: THEME.COLORS.PRIMARY } }}>
					<Text>Usuário copiado!</Text>
					<Text> Basta você colocar no Discord e conectar com seu duo!</Text>
				</Snackbar>
			</View>
		</Modal>
	);
}
