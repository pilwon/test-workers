import { makeExecutableSchema } from '@graphql-tools/schema';

import { GraphQLContext } from '../types';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

export default makeExecutableSchema<GraphQLContext>({ resolvers, typeDefs });
