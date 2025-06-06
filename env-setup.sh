#!/bin/bash

if [ -f .env ]; then
  exit 0
fi

echo "NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL" >> .env
echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env

echo "NEXT_PUBLIC_IMAGE_S3_URL=$NEXT_PUBLIC_IMAGE_S3_URL" >> .env
echo "NEXT_PUBLIC_IMAGE_CLOUDFRONT_URL=$NEXT_PUBLIC_IMAGE_CLOUDFRONT_URL" >> .env

echo "NEXT_PUBLIC_CHANNEL_KEY=$NEXT_PUBLIC_CHANNEL_KEY" >> .env

echo "NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID" >> .env
echo "GOOGLE_OAUTH_CLIENT_SECRET=$GOOGLE_OAUTH_CLIENT_SECRET" >> .env

echo "REFRESH_KEY=$REFRESH_KEY" >> .env

echo "OAUTH_SERVER_SECRET=$OAUTH_SERVER_SECRET" >> .env
echo "TOKEN_SECET=$TOKEN_SECRET" >> .env