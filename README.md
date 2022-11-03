# react-native-securionpay-sdk
Implementation of the securionpay sdk for react-native and expo

## Prerequirements

3D Secure library license requirements force Securionpay to distribute  the ipworks3ds_sdk it via email. Contact support@securionpay.com to get it. 


### IOS
Download both ipworks3ds_sdk_debug.xcframework and ipworks3ds_sdk_release.xcframework 3D-Secure libraries and copy them to a directory of your project. 

### Android
Download both ipworks3ds_sdk_deploy.aar and ipworks3ds_sdk.aar 3D-Secure libraries and copy them to a directory of your project. 

#


## Installation

```sh
npm install react-native-securionpay-sdk
```
## Configuration

After installing the package you will need to run the `securionpay-link` command to link the native ipworks3DS  libraries to your project for ANDROID and IOS.
```bash
npx securionpay-link --ios <path>/ipworks3ds_sdk_release.xcframework --android  <path>/ipworks3DS/ipworks3ds_sdk_deploy.aar
```

If you are using expo , you will need to run the `securionpay-link` also on the eas build for the dev-client and the release build. This can be done through the eas lifecycle hooks or with pre npm scripts. 

## Usage

```js
import {  Init, LaunchPayment } from 'react-native-securionpay-sdk';

// ...

Init( "<your public key>", "<bundleIdentifier for ios || signature for android>")

  LaunchPayment(
      "4012001800000016", // cardnumber
      "12",     // exp month
      "2022",   // exp year
      "123",    // cvc
      1000,     // amount multiplied by 100
      "EUR",    // currency
    ).then(x => {
      console.log(x)

    }).catch(x => {
      console.error(x)
    })

```

If you manage the cards or the token creation throught your own api you can pass the token object

```js
import {  Init, LaunchPayment } from 'react-native-securionpay-sdk';

// ...

  Init( "<your public key>", "<bundleIdentifier for ios || signature for android>")

   var data = {
      brand: "visa",
      country: "CH",
      created: 1666708744,
      expMonth: "12",
      expYear: "2029",
      fingerprint: "<fingerprint>",
      id: "<id_token_or_card>",
      number: "401200######0016",
      used : true
    }
    // test data from https://securionpay.com/docs/testing
    LaunchPaymentWithToken(
      data,
      5000, // amount multuplied by 100
      'EUR' // currency
    ).then((x) => {
       console.log(x);
    }).catch((x) => {
       console.log(x);
    });

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
