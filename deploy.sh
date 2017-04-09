#!/bin/bash
set -e

changeMod(){
  cd "../blog"
  chmod -R 777 .
  cd -
}

if [[ ! -d "../blog/public/vue2-cnode" ]]; then
  changeMod
  mkdir "../blog/public/vue2-cnode"
fi

npm run deploy

changeMod