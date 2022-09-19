import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-securionpay-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using expo managed workflow or build again the client with eas\n';

if (!NativeModules.Securionpay) {
  console.warn(LINKING_ERROR);
}
const Securionpay = NativeModules.Securionpay
  ? NativeModules.Securionpay
  : {
      Init: () => {
        return Promise.reject("'react-native-securionpay-sdk' is not linked");
      },
      LaunchPayment: () => {
        return Promise.reject("'react-native-securionpay-sdk' is not linked");
      },
    };

export function Init(publickey: String, signature?: String): Promise<any> {
  return Securionpay.Init(publickey, signature);
}

export function LaunchPayment(
  cardnumber: String,
  expirymonth: String,
  expiryyear: String,
  cvv: String,
  amount: Number,
  currency: String
): Promise<any> {
  return Securionpay.LaunchPayment(
    cardnumber,
    expirymonth,
    expiryyear,
    cvv,
    amount,
    currency
  );
}
