import { Character } from "./models/Character";

// This file is the main entry point for the frontend application.
const container = document.getElementById("app");

// Function to fetch characters from the backend API
const response = await fetch("http://localhost:3000/Soy_Luna");

// Check if the response is ok (status code 200-299)
const characters: Character[] = await response.json();

//Loop through the characters and create a div for each character
characters.forEach((character) => {
  const characterDiv = document.createElement("div");
  characterDiv.className = "character";
  const img = document.createElement("img");
  img.src = character.imgUrl;
  img.alt = character.name;
  characterDiv.appendChild(img);
  const h1 = document.createElement("h1");
  h1.innerText = character.name;
  characterDiv.appendChild(h1);
  const h2 = document.createElement("h2");
  h2.innerText = character.actor;
  characterDiv.appendChild(h2);
  
  container?.appendChild(characterDiv);
})
