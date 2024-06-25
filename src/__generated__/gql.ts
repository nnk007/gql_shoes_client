/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nmutation AddShoe($input: ShoeInput!) {\n  addShoe(input: $input) {\n    id\n  }\n}   \n": types.AddShoeDocument,
    "\n    query Shoes {\n      shoes {\n        id\n        name\n        brand\n        images\n        description\n        price\n      }\n    } \n": types.ShoesDocument,
    "\nmutation DelShoe($delShoeId: String!) {\n  delShoe(id: $delShoeId)\n}  \n": types.DelShoeDocument,
    "\nsubscription RateChanged {\n  rateChanged\n}\n": types.RateChangedDocument,
    "\nquery FeaturedShoes {\n  featuredShoes {\n    images\n    name\n    brand\n    price\n  }\n}\n": types.FeaturedShoesDocument,
    "\nquery Shoes {\n  shoes {\n    id\n    name\n    brand\n    images\n    description\n    price\n  }\n}    \n": types.ShoesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddShoe($input: ShoeInput!) {\n  addShoe(input: $input) {\n    id\n  }\n}   \n"): (typeof documents)["\nmutation AddShoe($input: ShoeInput!) {\n  addShoe(input: $input) {\n    id\n  }\n}   \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Shoes {\n      shoes {\n        id\n        name\n        brand\n        images\n        description\n        price\n      }\n    } \n"): (typeof documents)["\n    query Shoes {\n      shoes {\n        id\n        name\n        brand\n        images\n        description\n        price\n      }\n    } \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DelShoe($delShoeId: String!) {\n  delShoe(id: $delShoeId)\n}  \n"): (typeof documents)["\nmutation DelShoe($delShoeId: String!) {\n  delShoe(id: $delShoeId)\n}  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription RateChanged {\n  rateChanged\n}\n"): (typeof documents)["\nsubscription RateChanged {\n  rateChanged\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery FeaturedShoes {\n  featuredShoes {\n    images\n    name\n    brand\n    price\n  }\n}\n"): (typeof documents)["\nquery FeaturedShoes {\n  featuredShoes {\n    images\n    name\n    brand\n    price\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Shoes {\n  shoes {\n    id\n    name\n    brand\n    images\n    description\n    price\n  }\n}    \n"): (typeof documents)["\nquery Shoes {\n  shoes {\n    id\n    name\n    brand\n    images\n    description\n    price\n  }\n}    \n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;