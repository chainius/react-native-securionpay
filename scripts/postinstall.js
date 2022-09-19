const fs = require('fs');

if (!process.env.IPWORKS3DS_ONLY_ANDROID) {
  var path = process.env.IPWORKS3DS_FRAMEWORK_IOS;

  if (path === '' || path === undefined) {
    console.error(
      'IPWORKS3DS_FRAMEWORK_IOS environment variable is not set. Please set it to the path of the ipworks3ds_sdk.xcframework.'
    );
    process.exit(1);
  }

  if (!path.endsWith('.xcframework')) {
    console.error(
      'IPWORKS3DS_FRAMEWORK_IOS environment needs to be set to a xcframework folder'
    );
    process.exit(1);
  }

  var output = 'Frameworks/ipworks3ds_sdk.xcframework';

  if (fs.existsSync(output)) {
    fs.rmdirSync(output, { recursive: true });
  }

  fs.cpSync(path, output, { recursive: true });
}

if (!process.env.IPWORKS3DS_ONLY_IOS) {
  var path = process.env.IPWORKS3DS_FRAMEWORK_ANDROID;

  if (path === '' || path === undefined) {
    console.error(
      'IPWORKS3DS_FRAMEWORK_ANDROID environment variable is not set. Please set it to the path of the ipworks3ds_sdk.xcframework.'
    );
    process.exit(1);
  }

  if (!path.endsWith('.aar')) {
    console.error(
      'IPWORKS3DS_FRAMEWORK_ANDROID environment needs to be set to a aar file'
    );
    process.exit(1);
  }

  var output = 'android/libs/ipworks3ds_sdk_deploy.aar';

  if (fs.existsSync(output)) {
    fs.rmdirSync(output, { recursive: true });
  }

  fs.cpSync(path, output, { recursive: true });
}
