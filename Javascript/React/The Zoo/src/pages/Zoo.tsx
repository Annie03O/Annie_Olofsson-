import { useEffect, useState } from "react";
import type { ZooType } from "../models/Zoo";
import { getZoo } from "../services/zooServices";
import "../style/Zoo.css"
import { altimages } from "../models/Zoo";
import { Feeding } from "../models/Feeding";

export const Zoo = () => {
    const [zoo, setZoo] = useState<ZooType[]>(
        JSON.parse(localStorage.getItem("zoo") || "[]")
    );

    const [error, setError] = useState("");
    useEffect(() => {
       if (zoo.length === 0) {
        const fetchZoo = async () => {
            try {
                const animals = await getZoo();
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

    
        if (zoo.length > 0 && error !== "") return;

        fetchZoo();
    }
    }, []);

    useEffect(() => {
        localStorage.setItem("zoo", JSON.stringify(zoo))
    }, [zoo])

    const getAltImgUrl = (id: number) => {
        const alt = altimages.find(img => img.id === id);
        return alt?.altimageUrl || "";
    }
    
    const [food, setFood] = useState<Feeding>(
        new Feeding(true),
    )

    const handleFeeding = () => {
        setFood(new Feeding(true))
    }
    
    return (
        <div className="zoo font-serif">
            {error !== "" ? (
             <div>{error}</div>   
            ) : (
                zoo.map((a) => (
                    <article className="animal py-8" key={a.id}>                       
                        <section className="img-container">
                            <img src={a.imageUrl} alt="" onError={e => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                target.src = getAltImgUrl(a.id);
                                target.alt = "Alt img"
                            }}/>
                            <p>
                                { Date.now() - new Date(a.lastFed).getTime() > 5 * 60 * 60 * 1000 ? 
                                "Behöver matas" 
                                : Date.now() - new Date(a.lastFed).getTime() > 3 * 60 * 60 * 1000 ? 
                                "Hungrig" 
                                :"Mätt"}
                            </p>
                            <button className="rounded-3xl"
                                disabled={a.isFed}
                                onClick={() => {
                                    setZoo(zoo =>
                                        zoo.map(animal =>
                                            animal.id === a.id
                                                ? { ...animal, isFed: true, lastFed: new Date().toISOString() }
                                                : animal
                                        )
                                    );
                                }}
                            >
                                Mata
                            </button>
                        </section>
                        <section className="description">{a.shortDescription}</section>
                    </article>
                ))
            )}
        </div>
    )
}
