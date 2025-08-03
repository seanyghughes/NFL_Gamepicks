import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
  fetch: (uri, options) => {
    console.log('🌐 Apollo Client Request:', {
      uri,
      method: options.method,
      headers: options.headers,
      body: options.body
    });
    
    // Parse and log the GraphQL query
    if (options.body) {
      try {
        const parsed = JSON.parse(options.body);
        console.log('📝 GraphQL Query:', parsed.query);
        console.log('📝 GraphQL Variables:', parsed.variables);
      } catch (e) {
        console.log('📝 Raw body:', options.body);
      }
    }
    
    return fetch(uri, options);
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  
  console.log('🔐 Apollo Client Debug:', {
    hasToken: !!token,
    tokenLength: token?.length,
    headers: headers
  });
  
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      }
    }
  } else {
    return {
      headers: {
        ...headers,
      }
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> 
      <App />
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
