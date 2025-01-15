import { capitalizeFirstLetter } from "../utils";

export default function Card({cardInfo, clickHandler}) {
    return (
        <div className="card" onClick={clickHandler}>
            <img src={cardInfo.art} alt={cardInfo.name} />
            <h1>{capitalizeFirstLetter(cardInfo.name)}</h1>
        </div>
    );
}