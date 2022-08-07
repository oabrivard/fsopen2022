import { gql } from 'apollo-server';

export const typeDefs = gql`
  type RepositoryEdge {
    cursor: String!
    node: Repository!
  }

  type RepositoryConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [RepositoryEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
