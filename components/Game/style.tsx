import { Constants } from 'expo';
import { StyleSheet, Dimensions, ViewStyle } from 'react-native';

const KanColleGameAspectRatio = (1200 / 720);

const style = (() => {
  const name: string = Constants.deviceName;
  let { width, height } = Dimensions.get('window');
  if (width < height) [height, width] = [width, height];
  const container: ViewStyle = {
    height,
    width,
    backgroundColor: 'pink',
    display: 'flex',
  };
  const bottom: ViewStyle = {
    backgroundColor: '#101014',
    height: 0,
  };
  switch (name) {
    case 'iPhone XR':
      bottom.height = 22;
      container.width = (height - bottom.height) * KanColleGameAspectRatio;
    default:
      container.width = height * KanColleGameAspectRatio;
  }
  return StyleSheet.create({
    container,
    main: { flex: 1, },
    bottom,
  });
})();

export default style;
