import { IResolvers } from '@graphql-tools/utils';
import cuid from 'cuid';

import { GraphQLContext, Resolver } from '../types';

const foo: Resolver = () => 'bar';

const listObjects: Resolver = async (_, {}, { env }) => {
  const files = await env.R2_BUCKET.list();
  return files.objects.map((o) => o.key);
};

const upload: Resolver<{ file: File }> = async (_, { file }, { env, url }) => {
  const object = await env.R2_BUCKET.put(cuid(), file.stream(), {
    httpMetadata: {
      contentDisposition: `attachment; filename="${file.name}"`,
      contentType: file.type,
    },
  });
  return `${url.origin}/download/${object.key}`;
};

const resolvers: IResolvers<unknown, GraphQLContext> = {
  Query: {
    foo,
    listObjects,
  },
  Mutation: {
    upload,
  },
};

export default resolvers;
