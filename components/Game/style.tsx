import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    width: 800 - (22 * 7 - 8),
    backgroundColor: 'pink',
    display: 'flex',
  },
  main: {
    flex: 1,
  },
  bottom: {
    height: 22,
    backgroundColor: '#101014',
  },
});

export default style;
