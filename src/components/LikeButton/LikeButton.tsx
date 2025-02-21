import "./LikeButton.css"
import heartFill from "../../assets/heart-fill.svg"
import heartOutline from "../../assets/heart-outline.svg"

type LikeButtonProps = {
    onClick: React.MouseEventHandler<HTMLImageElement>,
    liked: boolean
}

export default function LikeButton({ onClick, liked } : LikeButtonProps) {
    return (
        <img
        className="likeButton"
        src={liked ? heartFill : heartOutline}
        alt={`Heart ${liked ? 'fill' : 'outline'} icon`}
        onClick={onClick}
        />
    )
}