import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Ghost } from 'phosphor-react-native';
import { Background } from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
	const [duos, setDuos] = useState<DuoCardProps | any>([]);
	const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

	const navigation = useNavigation();
	const route = useRoute();

	function handleGoBack() {
		navigation.goBack();
	}

	async function getDiscordUser(adId: string) {
		fetch(`http://192.168.1.3:3333/ads/${adId}/discord`)
			.then((response) => response.json())
			.then((data) => setDiscordDuoSelected(data.discord));
	}

	const game = route.params as GameParams;

	useEffect(() => {
		fetch(`http://192.168.1.3:3333/games/${game.id}/ads`)
			.then((response) => response.json())
			.then((data) => setDuos(data));
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} />
					</TouchableOpacity>

					<Image source={logoImg} style={styles.logo} />
					<View style={styles.right} />
				</View>

				<Image
					source={{ uri: game.bannerUrl }}
					style={styles.cover}
					resizeMode='cover'
				/>

				<Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />

				<FlatList
					data={duos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
					)}
					horizontal
					style={styles.containerList}
					contentContainerStyle={[
						duos.length > 0 ? styles.contentList : styles.emptyList,
					]}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => (
						<View style={styles.emptyList}>
							<Ghost size={45} color={THEME.COLORS.CAPTION_300} />
							<Text style={styles.emptyListText}>
								Não existem anúncios criados para este jogo.
							</Text>
						</View>
					)}
				/>

				<DuoMatch
					visible={discordDuoSelected.length > 0}
					discord={discordDuoSelected}
					onClose={() => setDiscordDuoSelected('')}
				/>
			</SafeAreaView>
		</Background>
	);
}
