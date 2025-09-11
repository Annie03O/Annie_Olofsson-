import type { Response } from "../models/Response";
import type { ZooType } from "../models/Zoo";
import { getData } from "./serviceBase";

export const getZoo = async () => {
    // Fetch the list of animals from the API
    try {
        const response = await getData<Response>(
            "https://animals.azurewebsites.net/api/animals"
        );

        //Check the response in console
        console.log(response);
        
        // Returns fetched data
        return response;
    } 
    // Handle any errors that occur during the fetch
    catch (error) {
        console.error("Error getting data from api");
        throw error;
    }
};

// Call the function to fetch zoo data
getZoo();

// Function to fetch a specific animal by its ID
export const getAnimal = async (id: string) => {
    // Fetch the animal data from the API using the provided ID
    const response = await getData<ZooType>(
        "https://animals.azurewebsites.net/api/animals?id=" + id
    )

    // Return the fetched animal data
    return response;
}