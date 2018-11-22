import {Constants} from "expo";

export function isIPhoneX() {
  return /iPhone\s*X/.test(Constants.deviceName)
}

export function isIPadPro() {
  return /iPad\s*Pro/.test(Constants.deviceName)
}
