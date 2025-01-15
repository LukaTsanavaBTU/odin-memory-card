import { useState } from "react"
import { useEffect } from "react"
import { shuffled } from "../utils.js"
import Card from "./Card.jsx"

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
    const [clicked, setClicked] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

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

    function clickHandler(name) {
        if (!clicked.includes(name)) {
            const newScore = score + 1;
            setClicked([...clicked, name]);
            setScore(newScore);
            if (newScore > highScore) {
                setHighScore(newScore);
            }
            if (newScore === pokemons.length) {
                console.log("You Win!");
                reset();
            }
            setPokemons(shuffled(pokemons));

        } else {
            console.log("You lose!");
            reset();
        }
    }

    function reset() {
        setClicked(0);
        setScore(0);
        setClicked([]);
        setPokemons(shuffled(pokemons));
    }

    return (
        <>
            <p>Score: {score}</p>
            <p>HighScore: {highScore}</p>
            <div className={"cards-wrapper"}>
                {pokemons.length ?
                pokemons.map((pokemon) =>
                    <Card
                        key={pokemon.name}
                        cardInfo={pokemon}
                        clickHandler={() => clickHandler(pokemon.name)}
                    />
                )
                : "Loading"}
            </div>
        </>
    );
}