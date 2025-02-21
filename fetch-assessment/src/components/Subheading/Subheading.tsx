import "./Subheading.css"

export default function Subheading({ text } : { text: string }) {
    return (
        <h2 className="subheading">{text}</h2>
    )
}