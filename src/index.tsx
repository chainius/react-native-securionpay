import { NativeModules, Platform } from 'react-native';
interface ThreeDSecureInfo {
  amount: Number;
  currency: String;
  enrolled: Boolean;
  version: String;
  liabilityShift: Number;
}
interface Token {
  id: String;
  created?: Number;
  objectType?: String;
  first6?: String;
  last4?: String;
  fingerprint?: String;
  expirationMonth?: String;
  expirationYear?: String;
  cardholder?: String;
  brand: String;
  type?: String;
  country?: String;
  used: Boolean;
  threeDSecureInfo?: ThreeDSecureInfo;
}

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


  console.log(Object.keys(Securionpay))

export function Init(publickey: String, signature?: String): Promise<any> {
  return Securionpay.Init(publickey, signature);
}

export function LaunchPaymentWithToken(
  token: Token,
  amount: Number,
  currency: String
) {
  return Securionpay.LaunchPaymentWithToken(
    JSON.stringify(token),
    amount,
    currency
  );
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
