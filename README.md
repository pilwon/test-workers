# test-workers

TypeScript + Workers + R2 + Itty Router + GraphQL Yoga + File Uploader

## Install

    npm install

## Dev

```sh
npx wrangler dev -l
# http://127.0.0.1:8787
# http://127.0.0.1:8787/headers
# http://127.0.0.1:8787/graphql <-- query "{ foo, listObjects }"

curl localhost:8787/graphql \
  -F operations='{ "query": "mutation ($file: File!) { upload(file: $file) }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@'README.md' # <-- replace with any file (<=100MB) to upload

# Grab the download link returned by GraphQL server, then download it.
```

## Publish

```sh
# npx wrangler r2 bucket create test-workers
npx wrangler publish
```