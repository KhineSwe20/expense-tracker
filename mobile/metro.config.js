const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// eas-cli installs nested deps under @expo/.eas-json-* which can break Metro's file watcher on Windows
config.resolver.blockList = [
  ...(Array.isArray(config.resolver.blockList) ? config.resolver.blockList : []),
  /node_modules\/@expo\/\.eas-json-.*/,
  /node_modules\/eas-cli\/.*/,
];

config.watcher = {
  ...config.watcher,
  additionalExts: config.watcher?.additionalExts,
};

module.exports = config;
