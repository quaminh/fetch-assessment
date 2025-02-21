import "./DogsDisplay.css"


export default function DogsDisplay({ children } : { children: React.ReactNode}) {
    return (
        <div className="dogsDisplay light-bg">
            {children}
        </div>
    )
}