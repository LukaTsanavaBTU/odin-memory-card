import { capitalizeFirstLetter } from "../utils";

export default function Card({cardInfo, clickHandler}) {
    return (
        <div className="card" onClick={clickHandler}>
            <img src={cardInfo.art} alt={cardInfo.name} />
            <div className="line"></div>
            <h2>{capitalizeFirstLetter(cardInfo.name)}</h2>
        </div>
    );
}