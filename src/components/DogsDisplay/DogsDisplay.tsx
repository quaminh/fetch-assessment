import "./DogsDisplay.css"


export default function DogsDisplay({ children, overflow } : { children: React.ReactNode, overflow?: boolean }) {
    return (
        <div className={`dogsDisplay light-bg ${overflow ? "overflow" : ""}`}>
            {children}
        </div>
    )
}