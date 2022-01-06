import {StyleSheet} from 'react-native';
import {scaleFont} from '../../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginTop: 48,
    marginBottom: 24,
    fontSize: scaleFont(40),
    color: '#fff',
    fontWeight: '700',
  },
  subtitle: {
    color: '#fff',
  },
});
