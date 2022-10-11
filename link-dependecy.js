#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cli = require('cli');

var colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  reset: '\x1b[0m',
};
cli.parse({
  ios: ['i', 'path to xcframework folder', 'file'],
  android: ['a', 'path to aar file', 'file'],
});

function WriteFileFolder(key, from, output, neededext, isFolder) {
  if (!from.endsWith(neededext)) {
    console.error(
      colors.red,
      key +
        ' argument needs to be set to a ' +
        neededext +
        ' ' +
        (isFolder ? 'folder' : 'file'),
      colors.reset
    );
    return;
  } else if (!fs.existsSync(from)) {
    console.error(
      colors.red,
      key + ' argument ' + path.resolve(from) + ' does not exist',
      colors.reset
    );
    return;
  }

  if (fs.existsSync(output)) {
    fs.rmSync(output, { recursive: isFolder });
  }

  fs.cpSync(from, output, { recursive: isFolder });
  console.log(
    colors.green,
    'Successfully linked ' + key + ' dependency',
    colors.reset
  );
}

if (cli.options.ios) {
  WriteFileFolder(
    'IOS',
    cli.options.ios,
    `${__dirname}/Frameworks/ipworks3ds_sdk.xcframework`,
    '.xcframework',
    true
  );
}

if (cli.options.android) {
  WriteFileFolder(
    'Android',
    cli.options.android,
    `${__dirname}/android/libs/ipworks3ds_sdk_deploy.aar`,
    '.aar',
    false
  );
}
