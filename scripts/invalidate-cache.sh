#!/bin/sh

aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTO_ID \
  --paths "/*"
