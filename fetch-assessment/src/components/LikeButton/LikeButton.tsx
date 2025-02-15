import "./LikeButton.css"

type LikeButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    liked: boolean
}

export default function LikeButton({ onClick, liked } : LikeButtonProps) {
    return (
        <button onClick={onClick} className={liked ? "liked" : ""}>&lt;3</button>
    )
}