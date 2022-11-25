import { Request as CFRequest } from '@cloudflare/workers-types';
import { createYoga } from 'graphql-yoga';
import { ThrowableRouter } from 'itty-router-extras';

import graphqlSchema from './graphql';
import * as handlers from './handlers';
import { Env, GraphQLContext, Handler } from './types';

export const graphqlEndpoint = '/graphql';

export const graphql = createYoga<GraphQLContext>({
  graphqlEndpoint,
  landingPage: false,
  schema: graphqlSchema,
});

export default {
  async fetch(req: CFRequest, env: Env, ctx: ExecutionContext) {
    const graphqlHandler: Handler = ({ url }) =>
      graphql.fetch(req as unknown as Request, { env, ctx, url: new URL(url) });

    return ThrowableRouter()
      .get('/', handlers.root)
      .get('/download/:key', handlers.download)
      .get('/headers', handlers.headers)
      .all(graphqlEndpoint, graphqlHandler)
      .handle(req, { env, ctx });
  },
};
