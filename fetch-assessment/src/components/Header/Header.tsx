import "./Header.css"
import Heading from "../Heading/Heading.tsx"
import Button from "../Button/Button"

export default function Header({ handleLogout } : { handleLogout: Function }) {
    return (
        <div className="header light-bg mainHeader">
            <Heading text="FETCH A DOG!" white={true} />
            <Button onClick={() => handleLogout()} text="LOGOUT" />
        </div>
    )
}