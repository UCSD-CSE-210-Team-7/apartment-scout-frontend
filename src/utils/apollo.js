import React, {useContext} from 'react';

import { 
    ApolloProvider as ReferenceApolloProvider, 
    ApolloClient, 
    HttpLink, 
    ApolloLink, 
    InMemoryCache, 
    concat 
} from '@apollo/client';

import Auth from '../utils/auth';

export const ApolloProvider = (props) => {

    const auth = useContext(Auth)

    const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization: auth.credential,
                admin: true,
            }
        }));

        return forward(operation);
    })

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: concat(authMiddleware, httpLink),
    });

    return (
        <ReferenceApolloProvider client={client}>
            {props.children}
        </ReferenceApolloProvider>
    )
}
