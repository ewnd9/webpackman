#!/bin/bash

config="node_modules/webpackman/webpack.config.js"

if [ "$1" == "--config" ]; then
  config="$2"
  shift 2
fi

node_modules/.bin/webpack-dev-server --config "$config" "$@"
