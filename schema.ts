export const schemaQL = `#graphql
    type Flight {
        id: ID!
        origen: String!
        destino: String!
        fecha: String!
    }

    type Query {
        getFlights(origen: String, destino: String): [Flight!]!
        getFlight(id: ID!): Flight
    }

    type Mutation {
        addFlight(origen: String!, destino: String!, fecha: String!): Flight!
    }
`