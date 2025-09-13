#!/bin/bash
echo \"Building the application...\"
npm run build

echo \"Stopping any existing production server...\"
npm run stop:prod

echo \"Starting production server...\"
npm run start:prod

echo \"Deployment completed successfully!\"
