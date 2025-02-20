import "./SmallMessage.css"

export default function SmallMessage({ text, error } : { text: string, error?: boolean }) {
    return (
        <p className={error ? "error" : ""}>{text}</p>
    )
}