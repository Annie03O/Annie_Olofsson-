import { useEffect, useState } from "react";
import type { ZooType } from "../models/Zoo";
import { getZoo } from "../services/zooServices";
import "../style/Zoo.css"
import { altimages } from "../models/Zoo";
import { Feeding } from "../models/Feeding";

// Component to display the zoo animals and handle feeding
export const Zoo = () => {
    // State to hold the list of animals in the zoo
    const [zoo, setZoo] = useState<ZooType[]>(
        JSON.parse(localStorage.getItem("zoo") || "[]")
    );

    // State to hold any error messages
    const [error, setError] = useState("");

    // Fetch zoo data when the component mounts
    useEffect(() => {
        // Only fetch if the zoo is empty
       if (zoo.length === 0) {
        // Function to fetch zoo data from the service
        const fetchZoo = async () => {
            // Clear any previous errors
            try {
                const animals = await getZoo();
                // Check if the fetched data is an array
                if (Array.isArray(animals)) {
                    setZoo(animals);
                    localStorage.setItem("zoo", JSON.stringify(animals));
                } else {
                    setError("Error: Invalid data received");
                }
 
            } catch (error) {
                setError("Error getting data")       
            }
        };

        // Prevent multiple fetches if there's already data or an error
        if (zoo.length > 0 && error !== "") return;

        fetchZoo();
    }
    }, []);

    // Save zoo data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("zoo", JSON.stringify(zoo))
    }, [zoo])

    // Function to get an alternative image URL if the main image fails to load
    const getAltImgUrl = (id: number) => {
        const alt = altimages.find(img => img.id === id);
        return alt?.altimageUrl || "";
    }

    // State to manage feeding status
    const [food, setFood] = useState<Feeding>(
        new Feeding(true),
    )

    // Function to handle feeding action
    const handleFeeding = () => {
        setFood(new Feeding(true))
    }
    
    return (
        // Render the zoo animals or an error message
        <div className="zoo font-serif">
            {/* If there is an error, return error in a div */}
            {error !== "" ? (
             <div>{error}</div>   
            ) : 
            // Else, map through the zoo array and display each animal
            (
                zoo.map((a) => (
                    // Each animal is displayed in an article element
                    <article className="animal py-8" key={a.id}>     
                        {/* Img-container */}
                        <section className="img-container">
                            {/* img-tag displaying image from api*/}
                            <img src={a.imageUrl} alt="" 
                            // If image fails to load, use alternative image
                            onError={(e: { currentTarget: any; }) => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                target.src = getAltImgUrl(a.id);
                                target.alt = "Alt img"
                            }}/>
                            {/* Show if the animal has been fed */}
                            <p>
                                {/* If it has been more than five hours since last fed, display "Behöver matas" (needs to be fed) */}
                                { Date.now() - new Date(a.lastFed).getTime() > 5 * 60 * 60 * 1000 ? 
                                "Behöver matas" 
                                // If it has been more than three hours since last fed, display "Hungrig" (hungry)
                                : Date.now() - new Date(a.lastFed).getTime() > 3 * 60 * 60 * 1000 ? 
                                "Hungrig" 
                                // Else, display "Mätt" (full)
                                :"Mätt"}
                            </p>
                            {/* Button to feed the animal */}
                            <button className="rounded-3xl"
                                // Disable the button if the animal is already fed
                                disabled={a.isFed}
                                // On click, update the animal's feeding status and last fed time
                                onClick={() => {
                                    // Handle feeding logic
                                    setZoo(zoo =>
                                        // Map through the zoo array and update the specific animal
                                        zoo.map(animal =>
                                            animal.id === a.id
                                                // Update the animal's isFed status and lastFed time
                                                ? { ...animal, isFed: true, lastFed: new Date().toISOString() }
                                                : animal
                                        )
                                    );
                                }}
                            >
                                Mata
                            </button>
                        </section>
                        {/* Section displaying the animal's name */}
                        <section className="description">{a.shortDescription}</section>
                    </article>
                ))
            )}
        </div>
    )
}
