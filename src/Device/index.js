export function isIPhoneX() {
  return /iPhone\s*X/.test(Expo.Constants.deviceName)
}

export function isIPadPro() {
  return /iPad\s*Pro/.test(Expo.Constants.deviceName)
}
