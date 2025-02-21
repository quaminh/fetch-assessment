import "./Heading.css"

export default function Heading({ text, white, leftMargin } : { text: string, white?: boolean, leftMargin?: boolean }) {
    return (
        <h1 className={`${white ? "white" : ""} ${leftMargin ? "left-margin" : ""}`}>
            {text}
        </h1>
    )
}