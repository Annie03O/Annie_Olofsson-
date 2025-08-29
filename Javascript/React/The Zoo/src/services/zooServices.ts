import type { Response } from "../models/Response";
import type { ZooType } from "../models/Zoo";
import { getData } from "./serviceBase";

export const getZoo = async () => {
    try {
        const response = await getData<Response>(
            "https://animals.azurewebsites.net/api/animals"
        );

        console.log(response);
        

        return response;
    } catch (error) {
        console.error("Error getting data from api");
        throw error;
    }
};

getZoo();

export const getAnimal = async (id: string) => {
    const response = await getData<ZooType>(
        "https://animals.azurewebsites.net/api/animals?id=" + id
    )

    return response;
}