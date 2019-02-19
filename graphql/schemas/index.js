import { gql } from 'apollo-server-express';

import userSchema from './user';
import articleSchema from './article';
import categorySchema from './category';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, articleSchema, categorySchema];