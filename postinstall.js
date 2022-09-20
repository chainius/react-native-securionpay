const fs = require('fs');

if (!process.env.IPWORKS3DS_ONLY_ANDROID) {
  var path = process.env.IPWORKS3DS_FRAMEWORK_IOS,
    output = `${__dirname}/Frameworks/ipworks3ds_sdk.xcframework`,
    exist = fs.existsSync(output);

  if (path && !exist) {
    console.error(
      'IPWORKS3DS_FRAMEWORK_IOS environment variable is not set. Please set it to the path of the ipworks3ds_sdk.xcframework.'
    );
    process.exit(1);
  }

  if (path) {
    if (!path.endsWith('.xcframework')) {
      console.error(
        'IPWORKS3DS_FRAMEWORK_IOS environment needs to be set to a xcframework folder'
      );
      process.exit(1);
    }

    if (fs.existsSync(output)) {
      fs.rmdirSync(output, { recursive: true });
    }

    fs.cpSync(path, output, { recursive: true });
  }
}

if (!process.env.IPWORKS3DS_ONLY_IOS) {
  var path = process.env.IPWORKS3DS_FRAMEWORK_ANDROID,
    output = `${__dirname}/android/libs/ipworks3ds_sdk_deploy.aar`,
    exist = fs.existsSync(output);

  if (path && !exist) {
    console.error(
      'IPWORKS3DS_FRAMEWORK_ANDROID environment variable is not set. Please set it to the path of the ipworks3ds_sdk.xcframework.'
    );
    process.exit(1);
  }

  if (path) {
    if (!path.endsWith('.aar')) {
      console.error(
        'IPWORKS3DS_FRAMEWORK_ANDROID environment needs to be set to a aar file'
      );
      process.exit(1);
    }

    if (fs.existsSync(output)) {
      fs.rmdirSync(output, { recursive: true });
    }

    fs.cpSync(path, output, { recursive: true });
  }
}
