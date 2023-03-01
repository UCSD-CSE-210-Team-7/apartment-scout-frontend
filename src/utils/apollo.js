import React, {useContext} from 'react';

import { 
    ApolloProvider as _ApolloProvider, 
    ApolloClient, 
    HttpLink, 
    ApolloLink, 
    InMemoryCache, 
    concat 
} from '@apollo/client';

import Cookies from 'universal-cookie'
import Auth from '../utils/auth';

const cookies = new Cookies()

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
        <_ApolloProvider client={client}>
            {props.children}
        </_ApolloProvider>
    )
}
