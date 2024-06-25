/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addShoe?: Maybe<Shoe>;
  delShoe: Scalars['Boolean']['output'];
  delShoes: Array<Scalars['Boolean']['output']>;
};


export type MutationAddShoeArgs = {
  input: ShoeInput;
};


export type MutationDelShoeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDelShoesArgs = {
  ids: Array<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  featuredShoes: Array<Shoe>;
  shoe?: Maybe<Shoe>;
  shoes: Array<Shoe>;
};


export type QueryShoeArgs = {
  id: Scalars['String']['input'];
};

export type Shoe = Ware & {
  __typename?: 'Shoe';
  brand: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type ShoeInput = {
  brand: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  images: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  rateChanged: Scalars['Float']['output'];
};

export type Ware = {
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type AddShoeMutationVariables = Exact<{
  input: ShoeInput;
}>;


export type AddShoeMutation = { __typename?: 'Mutation', addShoe?: { __typename?: 'Shoe', id: string } | null };

export type ShoesQueryVariables = Exact<{ [key: string]: never; }>;


export type ShoesQuery = { __typename?: 'Query', shoes: Array<{ __typename?: 'Shoe', id: string, name: string, brand: string, images: Array<string>, description?: string | null, price: number }> };

export type DelShoeMutationVariables = Exact<{
  delShoeId: Scalars['String']['input'];
}>;


export type DelShoeMutation = { __typename?: 'Mutation', delShoe: boolean };

export type RateChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RateChangedSubscription = { __typename?: 'Subscription', rateChanged: number };

export type FeaturedShoesQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturedShoesQuery = { __typename?: 'Query', featuredShoes: Array<{ __typename?: 'Shoe', images: Array<string>, name: string, brand: string, price: number }> };


export const AddShoeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddShoe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShoeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addShoe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddShoeMutation, AddShoeMutationVariables>;
export const ShoesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Shoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<ShoesQuery, ShoesQueryVariables>;
export const DelShoeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DelShoe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delShoeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delShoe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delShoeId"}}}]}]}}]} as unknown as DocumentNode<DelShoeMutation, DelShoeMutationVariables>;
export const RateChangedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RateChanged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateChanged"}}]}}]} as unknown as DocumentNode<RateChangedSubscription, RateChangedSubscriptionVariables>;
export const FeaturedShoesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeaturedShoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"featuredShoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<FeaturedShoesQuery, FeaturedShoesQueryVariables>;