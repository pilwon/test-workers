import { Request as CFRequest } from '@cloudflare/workers-types';
import { Request as IttyRequest } from 'itty-router';

export type PromiseOrValue<T> = T | Promise<T>;

export interface Env {
  R2_BUCKET: R2Bucket;
}

export interface GraphQLContext {
  env: Env;
  ctx: ExecutionContext;
  url: URL;
}

export interface IttyContext {
  env: Env;
  ctx: ExecutionContext;
}

export type Handler = (
  req: CFRequest & IttyRequest,
  ctx: IttyContext
) => PromiseOrValue<Error | Response>;

export type Resolver<T = {}> = (
  src: unknown,
  args: T,
  ctx: GraphQLContext
) => any;
