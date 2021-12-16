// import Vue from 'vue';
// import VueApollo from 'vue-apollo';
// import {ApolloClient} from 'apollo-client';
// // import { HttpLink } from 'apollo-link-http'
// import {InMemoryCache} from 'apollo-cache-inmemory';
// import {createUploadLink} from 'apollo-upload-client';
// // import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';

// // import { GRAPHQL_ENDPOINT } from './config'
// import config from './config/api';

// // ----------------------------------------------------------------------------------------
// // import { ApolloLink, HttpLink } from '@apollo/client';

// // const httpLink = new HttpLink({ uri: config.API_URL_GRAPHQL + 'graphql' });

// // const startLink = new ApolloLink((operation, forward) => {
// //     operation.setContext({
// //         headers: {
// //             'Content-Type': 'application/json'
// //         }
// //     });
// //     return forward(operation);
// // });

// // export const apolloClient = new ApolloClient({
// //     link: startLink.concat(httpLink)
// // })
// // ----------------------------------------------------------------------------------------

// // const { createUploadLink } = require('apollo-upload-client');

// // const httpLink = new HttpLink({
// //   // You should use an absolute URL here
// //   uri: config.API_URL_GRAPHQL + 'graphql'
// // })

// const httpLink = createUploadLink({
//     uri: config.API_URL_GRAPHQL + 'graphql',
// });

// // Create the apollo client
// export const apolloClient = new ApolloClient({
//     link: httpLink,
//     // link: createUploadLink(httpLink),
//     // link: createUploadLink(config.API_URL_GRAPHQL + 'graphql'),
//     cache: new InMemoryCache(),
//     headers: {
//         'Content-Type': 'application/jsom', // this header will reach the server
//     },
//     connectToDevTools: true,
// });

// // console.log(apolloClient);

// const apolloProvider = new VueApollo({
//     defaultClient: apolloClient,
// });

// // Install the vue plugin
// Vue.use(VueApollo);

// export default apolloProvider;
