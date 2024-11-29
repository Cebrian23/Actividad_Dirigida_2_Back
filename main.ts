import { MongoClient } from "mongodb";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";
import { schemaQL } from "./schema.ts";
import { FlightModel } from "./types.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL){
  throw new Error("Please provide a MONGO_URL");
}

const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Connected to MongoDB");

const db = client.db("Vuelos");
const VuelosCollection = db.collection<FlightModel>("Vuelos");

const server = new ApolloServer({
  typeDefs: schemaQL,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ VuelosCollection }),
  listen: {port: 8000},
});

console.log(`Server ready at: ${url}`);