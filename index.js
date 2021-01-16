const { ApolloServer, gql } = require('apollo-server');

const msgs = [];

const typeDefs = gql`
    type messageType {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [messageType!]!
    }

    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }
`

const resolvers = {
    Query: {
        messages: () => msgs
    },
    
    Mutation: {
        postMessage: (_, {user, content}) => {
            let id = msgs.length;

            msgs.push({ id, user, content });

            return id;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
   console.log(`🚀 Server ready at ${url}`);
});