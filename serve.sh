#!/bin/bash

config="node_modules/webpackman/webpack.config.js"

while (( "$#" )); do
  if [ "$1" == "--config" ]; then
    shift
    config="$1"
  fi

  shift
done

node_modules/.bin/webpack-dev-server --config "$config"
