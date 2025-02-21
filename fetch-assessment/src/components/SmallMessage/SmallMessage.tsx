import "./SmallMessage.css"

export default function SmallMessage({ text } : { text: string }) {
    return (
        <p>{text}</p>
    )
}