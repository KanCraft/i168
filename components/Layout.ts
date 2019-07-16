import { StyleSheet, Dimensions, ViewStyle, Platform } from 'react-native';
import { ItemProps } from './SideBar/Item';

const KanColleGameAspectRatio = (1200 / 720);
const HomebarHeight = 22;

let { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
if (WIDTH < HEIGHT) [HEIGHT, WIDTH] = [WIDTH, HEIGHT];

/**
 * これここにあるべきではないけど、今んとこprivateだしいいかな、って。
 * https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/Displays/Displays.html
 */
function getDeviceModel(): string {
  const dimension = Dimensions.get('window');
  if (Platform.OS == 'ios') {
    const has = (pix: number): boolean => dimension.height == pix || dimension.width == pix;
    if (Platform.isPad) {
      if (has(1366)) return 'iPad Pro 12.9-inch';
      if (has(834)) return 'iPad Pro 10.5-inch';
      if (has(1024)) return 'iPad Pro';
      return 'iPad';
    } else {
      if (has(896)) return 'iPhone XR';
      if (has(812)) return 'iPhone X';
      if (has(736)) return 'iPhone 8 Plus';
      if (has(667)) return 'iPhone 8';
      if (has(568)) return 'iPhone SE';
      return 'iPhone';
    }
  }
  return 'i168_UNKONW';
};

interface Styles {
  top: ViewStyle;
  left: ViewStyle;
  game: ViewStyle;
  right: ViewStyle;
  bottom: ViewStyle;
}

/**
 * Deviceによってボタンの配置を買えなきゃならんので、必要なアクションはUser側から渡してください。
 */
export function arrangeActions({ reload, screenshot }: { reload: ItemProps, screenshot: ItemProps }): {
  top?: { left: ItemProps[], right: ItemProps[] },
  left?: { top?: ItemProps[] },
  right?: { top?: ItemProps[] },
  bottom?: { left: ItemProps[], right: ItemProps[] },
} {

  const model = getDeviceModel();

  const actions = {
    top: { left: [], right: [] },
    left: { top: [] }, right: { top: [] },
    bottom: { left: [], right: [] },
  };
  if (/iPad Pro/i.test(model)) {
    actions.top = { left: [reload], right: [screenshot] };
  } else if (/iPhone X/i.test(model)) {
    actions.left = { top: [reload] };
    actions.right = { top: [screenshot] };
  } else if (/iPhone SE/i.test(model)) {
    actions.right = { top: [{ ...screenshot, size: 24 }, { ...reload, size: 24 }] };
  } else if ((WIDTH / HEIGHT) > KanColleGameAspectRatio) {
    actions.left = { top: [reload] };
    actions.right = { top: [screenshot] };
  } else {
    actions.top = { left: [reload], right: [screenshot] };
  }
  return actions;
}

/**
 * Deviceによって、ホームバーがしたにあったり、左のバーが要らなかったりするので。
 */
const styles: Styles = (() => {

  const model = getDeviceModel();

  const top: ViewStyle = {
    flexDirection: 'row', alignItems: 'center',
    paddingLeft: 24, paddingRight: 24,
  };
  const left: ViewStyle = { alignItems: 'center' };
  const game: ViewStyle = {};
  const right: ViewStyle = { alignItems: 'center' };
  const bottom: ViewStyle = {
    flexDirection: 'row', alignItems: 'center',
    paddingLeft: 24, paddingRight: 24,
  };

  if (/iPad Pro/i.test(model)) {
    /**
     * 艦これに比べて縦長なので、上下を満たして、左右はゼロ。
     */
    top.flex = 1;
    bottom.flex = 1;
    left.flex = 0;
    right.flex = 0;
    game.width = WIDTH;
    game.height = WIDTH / KanColleGameAspectRatio;
  } else if (/iPhone X/i.test(model)) {
    /**
     * 艦これに対して横長なので、左右は満たすけど、
     * ホームバーがあるので、上はゼロだけど下はホームバーのぶんだけ広げる。
     */
    top.flex = 0;
    left.flex = 1;
    right.flex = 1;
    bottom.height = HomebarHeight;
    game.height = HEIGHT - HomebarHeight;
    game.width = (HEIGHT - HomebarHeight) * KanColleGameAspectRatio;
  } else if (/iPhone SE/i.test(model)) {
    /**
     * 艦これに対して横長だけど、アクションボタンが配置できないので、
     * 右のバーだけ集中させて、上下と左はゼロ。
     */
    top.flex = 0;
    bottom.flex = 0;
    left.flex = 0;
    right.flex = 1;
    game.height = HEIGHT;
    game.width = HEIGHT * KanColleGameAspectRatio;
  } else if ((WIDTH / HEIGHT) > KanColleGameAspectRatio) {
    /**
     * デバイスを指定しない、横長の場合
     */
    top.flex = 0;
    bottom.flex = 0;
    left.flex = 1;
    right.flex = 1;
    game.height = HEIGHT;
    game.width = HEIGHT * KanColleGameAspectRatio;
  } else {
    /**
     * デバイスを指定しない、縦長の場合
     */
    top.flex = 1;
    bottom.flex = 1;
    left.flex = 0;
    right.flex = 0;
    game.width = WIDTH;
    game.height = WIDTH / KanColleGameAspectRatio;
  }

  return StyleSheet.create({
    top,
    left, game, right,
    bottom,
  });
})();

export default styles;
