#!/bin/sh

# rm -rf dist/

# yarn build
# if [ $? != 0 ]; then
#   exit 1
# fi

aws s3 sync ./dist/ s3://$S3_BUCKET
if [ $? != 0 ]; then
  exit 1
fi

. ./scripts/invalidate-cache.sh
