#!/bin/sh

DEBUG_MODE="DEBUG"
REGULAR_MODE="REGULAR"

npm install

if [ $MODE = $DEBUG_MODE ]; then
   npm run debug
else
   npm run server
fi
