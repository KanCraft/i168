import Constants from 'expo-constants';
import { StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { ItemProps } from './SideBar/Item';

const KanColleGameAspectRatio = (1200 / 720);
const DeviceName: string = Constants.deviceName;

/**
 * Deviceによってボタンの配置を買えなきゃならんので、必要なアクションはUser側から渡してください。
 */
export function arrangeActions({ reload, screenshot }: { reload: ItemProps, screenshot: ItemProps }): ItemProps[][] {
  switch (DeviceName) {
    case 'iPhone SE':
      return [[], [{ ...screenshot, size: 24 }, { ...reload, size: 24 }]];
    default:
      return [[reload], [screenshot]];
  }
}

/**
 * Deviceによって、ホームバーがしたにあったり、左のバーが要らなかったりするので。
 */
const layout = (() => {
  let { width, height } = Dimensions.get('window');
  if (width < height) [height, width] = [width, height];
  const container: ViewStyle = {
    height,
    width,
    backgroundColor: 'pink',
    display: 'flex',
  };
  const homebar: ViewStyle = {
    backgroundColor: '#101014',
    height: 0,
  };
  const leftbar: ViewStyle = {
    flex: 1,
  };
  const rightbar: ViewStyle = {
    flex: 1,
  };
  switch (DeviceName) {
    case 'iPhone XR':
      homebar.height = 22;
      container.width = (height - homebar.height) * KanColleGameAspectRatio;
      break;
    case 'iPhone SE':
      container.width = height * KanColleGameAspectRatio;
      leftbar.flex = 0;
      break;
    default:
      container.width = height * KanColleGameAspectRatio;
  }
  return StyleSheet.create({
    container,
    main: { flex: 1, },
    homebar,
    leftbar,
    rightbar,
  });
})();

export default layout;
