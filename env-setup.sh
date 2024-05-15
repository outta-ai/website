#!/bin/bash

echo "$NEXT_PUBLIC_PAYLOAD_CMS_URL" >> .env
echo "$NEXT_PUBLIC_IMAGE_S3_URL" >> .env

echo "$NEXT_PUBLIC_CHANNEL_KEY" >> .env

echo "$REFRESH_KEY" >> .env