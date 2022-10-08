import { View, ActivityIndicator } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

export function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={32} color={THEME.COLORS.PRIMARY} />
		</View>
	);
}
