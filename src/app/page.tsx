'use client'
import { Storefront } from "@/components/Storefront";
import { client } from "../functions/initApolllo";
import { ApolloProvider } from "@apollo/client";

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <Storefront />
    </ApolloProvider>
  )
}