import React, { useContext } from "react";

import {
  ApolloProvider as ReferenceApolloProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import Auth from "../utils/auth";

import Cookies from "universal-cookie";

export const ApolloProvider = (props) => {
  const auth = useContext(Auth);

  const httpLink = new HttpLink({
    uri: "http://localhost:4000/",
    credentials: "include",
  });
  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/",
      connectionParams: {
        authorization: auth.credential,
        sessionCookie: new Cookies().get("sessionCookie"),
      },
    })
  );

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(data => {
      return {
        headers: {
          authorization: auth.credential,
          ...(data.headers ? data.headers : {}),
        }
      }
    });

    return forward(operation);
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    concat(authMiddleware, httpLink)
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });

  return (
    <ReferenceApolloProvider client={client}>
      {props.children}
    </ReferenceApolloProvider>
  );
};
