import { capitalizeFirstLetter } from "../utils";

export default function Card({cardInfo, clickHandler}) {
    return (
        <div onClick={clickHandler}>
            <img src={cardInfo.art} width="300px" alt={cardInfo.name} />
            <h1>{capitalizeFirstLetter(cardInfo.name)}</h1>
        </div>
    );
}