import { TypeSource } from '@graphql-tools/utils';

const typeDefs: TypeSource = /* GraphQL */ `
  scalar File

  type Query {
    foo: String
    listObjects: [String!]!
  }

  type Mutation {
    upload(file: File!): String!
  }
`;

export default typeDefs;
