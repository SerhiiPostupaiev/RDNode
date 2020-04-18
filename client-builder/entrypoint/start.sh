#!/bin/sh

DEV_MODE="DEV"

npm install

if [ $MODE = $DEV_MODE ]; then
    npm start
else
    npm run build
fi
