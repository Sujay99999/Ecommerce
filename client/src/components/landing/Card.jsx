import "./card.scss";
import { Link } from "react-router-dom";
const Card = (props) => {
  return (
    <div className="card">
      <div className="card_item">
        <img
          src={props.obj[0].item}
          className="card_item-img"
          alt="product img"
        />
        <div className="card_item-name">{props.obj[0].name} </div>
      </div>
      <div className="card_item">
        <img
          src={props.obj[1].item}
          className="card_item-img"
          alt="product img"
        />
        <div className="card_item-name">{props.obj[1].name} </div>
      </div>
      <div className="card_item">
        <img
          src={props.obj[2].item}
          className="card_item-img"
          alt="product img"
        />
        <div className="card_item-name">{props.obj[2].name} </div>
      </div>
      <div className="card_item">
        <img
          src={props.obj[3].item}
          className="card_item-img"
          alt="product img"
        />
        <div className="card_item-name">{props.obj[3].name} </div>
      </div>
      <Link to={`/results/${props.obj[5].toLink}`} className="card_title">
        <div className="card_title-name">{props.obj[4].title}</div>
        <span className="card_title-btn">&rarr;</span>
      </Link>
    </div>
  );
};
export default Card;
