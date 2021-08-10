import { StyleSheet } from 'react-native';
import { COLORS } from '../../Constants/colors';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 80,
    textAlign: 'center',
  },
  imageBg: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeFieldRoot: { marginBottom: 30 },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 2,
  },
  center: {
    alignItems: 'center',
  },
});

export { styles };
