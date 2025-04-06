import { Request, Response, text } from "express";
import { Character } from "../models/Character.mjs";

//List with all characters connected to the server
const characters: Character[] = [
    new Character(1, "Luna Valente", "Karol Sevilla", "https://64.media.tumblr.com/ed5e38a4c040c8569955101ecfd14857/4849b779804ab741-1b/s500x750/78e91899a4e51bc980ae75a4f26e344e794a7300.jpg"),
    new Character(2, "Matteo Balsano", "Ruggero Pasquarell", "https://img.wattpad.com/66b8202c82c94496c27686e701b6e8eb55ab0a01/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f544a4c5f4c534d665a5a6c4335773d3d2d3633353934343139322e313535383632653136336539343938303632373937363036303634392e6a7067"),
    new Character(3, "Simón Álvarez", "Micheal Ronda", "https://pm1.aminoapps.com/6924/823084da6fa1ad34f0589f53af60b7491bcaa6d8r1-320-320v2_00.jpg"),
    new Character(4, "Ámbar Smith", "Valentina Zenere","https://i.pinimg.com/474x/d2/4a/c8/d24ac8dd202c10bdd7acf95f2d8b4588.jpg"),
    new Character(5, "Nina Simonetti", "Carolina Kopelioff", "https://i.pinimg.com/564x/88/72/a2/8872a20dd293eb403e2efb6206e90566.jpg"),
    new Character(6, "Gastón Battan", "Agustín Bernasconi","https://img.wattpad.com/3e291a72d660402803cef7dccd883b845d5aeff4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f384a6372654d706e5f555f4c70513d3d2d3431323030313537342e313462653835326238316538616233633830333035303130383930332e6a7067?s=fit&w=720&h=720"),
    new Character(7, "Jim Medina", "Ana Jara", "https://i.pinimg.com/564x/d1/fb/f9/d1fbf97052e502657c3d99a9c4f854f7.jpg"),
    new Character(8, "Yam Sáchez", "Chiara Parravicini", "https://i.pinimg.com/564x/66/81/b9/6681b9e1f869bbab3be244c0bd66e267.jpg" ),
    new Character(9, "Ramiro Ponte", "Jorge López", "https://i.pinimg.com/736x/96/2f/9d/962f9d06582d29f8a4af5c21803fd4ed.jpg"),
    new Character(9, "Delfi Alzamendi", "Malena Ratner", "https://bilder.fernsehserien.de/gfx/person_1000/m/malena-ratner-w-893.jpg.jpg"),
    new Character(10, "Jazmín Carvajal", "Katja Martínez", "https://i.pinimg.com/474x/d5/f1/5b/d5f15bdcf97948598c92526fce7bf739.jpg"),
    new Character(11, "Nico Navarro", "Lionel Ferro", "https://i.pinimg.com/736x/03/7c/ca/037cca1a03ef48f4956b3fd5a6f27193.jpg"),
    new Character(12, "Pedro Arias", "Gastón Vietto", "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbzptYdSYM7JQi0PNuPzzVPTa6KJgcg2KBOc4ygFuP5cN1lLHe2JIRcsGj2eJoaEVvytiXpgjTwreqPndv4syb83l99BAzpewOa2XM-WRNqfp9MGmiVsMSgmW4zj3RJHZJERy3h5Wyc_A/s1600/Soy+Luna+profil+Pedro.png"),
]

// Function to get all characters or filter them by name
export const getCharacters = (req: Request, res: Response) => {
    const { q } = req.query;

    try {
        // If a query parameter "q" is provided, filter the characters by name
        if (q) {
            const filteredCharacters = characters.filter(
                (c) => c.name.indexOf(q.toString()) >= 0,
            );

            res.status(200).json(filteredCharacters);
        } 
        // If no query parameter is provided, return all characters
        else {
            res.status(200).json(characters);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Function to get a character by its ID
export const getCharacterById = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const foundCharacter = characters.find((c) => c.id === +id);
        // If the character is found, return it
        if (foundCharacter) {
            res.status(200).json(foundCharacter);
        } 
        // If the character is not found, return a 404 error
        else {
            res.status(400).json({ status: "Invalid id"})
        } 
    } 
    // If an error occurs, return a 500 error
    catch (error) {
        res.status(500).send(error);
    }
}

// Function to add a new character with "create" method
export const addCharacter = (req: Request, res: Response) => {
    const { name } = req.body;
    const { actor } = req.body;
    const { imgUrl } = req.body;

    try {
        // Validate the request body to ensure all required fields are provided
        if (!name) {
            res.status(400).json({ error: "Name is required"});
        }
        if (!actor) {
            res.status(400).json({ error: "Actor is required"})
        } 
        if (!imgUrl) {
            res.status(400).json({ error: "ImgUrl is required"}) 
        }
        // Check if a character with the same name already exists
        else {
            const newCharacter = new Character(characters.length + 1, name, actor,imgUrl);
            characters.push(newCharacter);
            res.status(201).json(newCharacter);
        }
    } catch (error) {
        res.status(500).send(error);
    };
};

// Function to update a character with "update" method
export const updateCharacters = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const { actor } = req.body;
    const { imgUrl } = req.body;
    try {
        // Validate the request body to ensure all required fields are provided
        if (!name) {
            res.status(400).json({ error: "Name is required"});
        };
        if (!actor) {
            res.status(400).json({ error: "Actor is required"});
        };
        if (!imgUrl) {
            res.status(400).json({ error: "ImgUrl is required"})
        } 
        // Check if a character with the same name already exists
        else {
            const character = characters.find((c) => c.id === +id);

            if (!character) {
                res.status(400).json({ error: "Invalid id"});
            } else {
                character.name = name;
                character.actor = actor;
                character.imgUrl = imgUrl;
                res.status(200).json(character);
            };
        }; 
    }   
    // If an error occurs, return a 500 error
    catch (error) {
        res.status(500).send(error);
    };
}; 

// Function to delete a character with "delete" method
export const deleteCharacter = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const index = characters.findIndex((c) => c.id === +id);
        // If the character is found, remove it from the list
        if (index === +1) {
            res.status(404).json({ error: "Character not found"})
        }
        // If the character is not found, return a 404 error
        else {
            const removedCharacter = characters.splice(index, 1);
            res.status(200).json(removedCharacter);
        }
    } 
    // If an error occurs, return a 500 error
    catch (error) {
        res.status(500).send(error);
    };
};