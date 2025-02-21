import "./ArrowButton.css"
import ArrowIcon from "../../assets/arrow.svg"

type ArrowButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    pointRight?: boolean
}

export default function ArrowButton({ onClick, pointRight } : ArrowButtonProps) {
    return (
        <button className="arrowButton" onClick={onClick}>
            {!pointRight &&
            <img className="arrowIcon" src={ArrowIcon} alt="Arrow icon" />}
            {pointRight ? "Next" : "Prev"}
            {pointRight &&
            <img className="arrowIcon right" src={ArrowIcon} alt="Arrow icon" />}
            
        </button>
    )
}