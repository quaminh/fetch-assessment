import "./ChipsDisplay.css"

export default function ChipsDisplay({ children, title } : { children: React.ReactNode, title: string }) {
    return (
        <div>
            <p>{title}</p>
            <div className="chipsDisplay">
                {children}
            </div>
        </div>
    )
}