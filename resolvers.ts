import { Collection, ObjectId } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { getFlightFromModel } from "./utilities.ts";

export const resolvers = {
    Query: {
        getFlights: async (
            _: unknown,
            args: {origen: string, destino: string},
            context: {VuelosCollection: Collection<FlightModel>}
        ): Promise<Flight[]> => {
            const { origen, destino } = args;
            let vuelos_db: FlightModel[] = [];

            if(!origen){
                vuelos_db = await context.VuelosCollection.find({destino: destino}).toArray();
            }
            else if(!destino){
                vuelos_db = await context.VuelosCollection.find({origen: origen}).toArray();
            }
            else{
                vuelos_db = await context.VuelosCollection.find().toArray();
            }
            
            return vuelos_db.map((vuelo) => getFlightFromModel(vuelo));
        },

        getFlight: async (
            _: unknown,
            args: { id: string },
            context: {VuelosCollection: Collection<FlightModel>}
        ): Promise<Flight | null> => {
            const { id } = args;

            const vuelo_db = await context.VuelosCollection.findOne({_id: new ObjectId(id)});

            if(!vuelo_db){
                return null;
            }
            return getFlightFromModel(vuelo_db)
        }
    },
    Mutation: {
        addFlight: async (
            _: unknown,
            args: {origen: string; destino: string; fecha: string},
            context: {VuelosCollection: Collection<FlightModel>}
        ): Promise<Flight> => {
            const { origen, destino, fecha } = args;

            const { insertedId } = await context.VuelosCollection.insertOne({
                origen,
                destino,
                fecha,
            });

            const Vuelo_creado = {
                _id: insertedId,
                origen,
                destino,
                fecha,
            };

            return getFlightFromModel(Vuelo_creado!);
        }
    }
}