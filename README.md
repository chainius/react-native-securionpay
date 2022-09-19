# react-native-securionpay-sdk
Implementation of the securionpay sdk for react-native and expo

## Prerequirements

3D Secure library license requirements force Securionpay to distribute  the ipworks3ds_sdk it via email. Contact support@securionpay.com to get it. 


### IOS
Download both ipworks3ds_sdk_debug.xcframework and ipworks3ds_sdk_release.xcframework 3D-Secure libraries and copy them to a directory in your project. 

Then set the env variable 
```bash
export IPWORKS3DS_FRAMEWORK_IOS=/path/to/the/file.xcframework
```
if you want to build an app only for IOS please add this envirnoment variable
```bash
export IPWORKS3DS_ONLY_IOS=1
```
### Android
Download both ipworks3ds_sdk_deploy.aar and ipworks3ds_sdk.aar 3D-Secure libraries and copy them to a directory in your project. 

Then set the env variable 
```bash
export IPWORKS3DS_ONLY_ANDROID=1
````

if you want to build an app only for android please add this envirnoment variable
```bash
export IPWORKS3DS_FRAMEWORK_ANDROID_ONLY=true
```
#


## Installation

```sh
npm install react-native-securionpay-sdk
```

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
