import {FlightModel} from "./types.ts"

export const getFlightFromModel = (Flight_In: FlightModel) => {
    return{
        id: Flight_In._id!.toString(),
        origen: Flight_In.origen,
        destino: Flight_In.destino,
        fecha: Flight_In.fecha,
    }
}