import "./Button.css"

type ButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    text: string
}

export default function Button({ onClick, text } : ButtonProps) {
    return (
        <button className="btn" onClick={onClick}>
            {text}
        </button>
    )
}