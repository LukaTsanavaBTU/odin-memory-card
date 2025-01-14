import { useState } from "react";
import { useEffect } from "react"
import Card from "./Card.jsx";

const pokemonNames = [
    "charizard",
    "pikachu",
    "bulbasaur",
    "lucario",
    "gengar",
    "greninja",
    "eevee",
    "gardevoir",
    "umbreon",
    "dragonite"
]; 

export default function CardsContainer() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        Promise.all(pokemonNames.map(name => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => response.json()))
        ).then((jsons) => {
            const newPokemons = jsons.map((json) => {
                return {name: json["name"], art:json["sprites"]["front_default"]}
            });
            setPokemons(newPokemons);
        });
    }, []);

    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {pokemons.length ?
            pokemons.map((pokemon) =>
                <Card
                    key={pokemon.name}
                    cardInfo={pokemon}
                    clickHandler={() => {console.log("clicked " + pokemon.name)}}
                />
            )
            : "Loading"}
        </div>
    );
}