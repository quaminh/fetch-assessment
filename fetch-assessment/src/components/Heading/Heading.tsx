import "./Heading.css"

export default function Heading({ text } : { text: string }) {
    return (
        <h1>{text}</h1>
    )
}