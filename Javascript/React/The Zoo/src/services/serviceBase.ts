import axios from "axios";

export const getData = async <T>(url: string) => {
    // Make a GET request to the specified URL and return the data
    const response = await axios.get<T>(url);

    // Return the data from the response
    return response.data;
};