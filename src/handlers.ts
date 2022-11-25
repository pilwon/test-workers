import { json, text } from 'itty-router-extras';

import { Handler } from './types';

export const root: Handler = () => text('test-workers');

export const download: Handler = async ({ params }, { env }) => {
  const key = params!.key;
  const object = await env.R2_BUCKET.get(key);
  if (!object) {
    return new Error(`invalid key: ${key}`);
  }
  return new Response(object?.body, {
    headers: {
      'Content-Disposition': object.httpMetadata?.contentDisposition!,
      'Content-Type': object.httpMetadata?.contentType!,
    },
  });
};

export const headers: Handler = ({ headers }) =>
  json(Object.fromEntries([...headers]));
