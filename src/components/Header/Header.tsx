import "./Header.css"
import Heading from "../Heading/Heading"
import Button from "../Button/Button"
import pawImage from "../../assets/paw.svg"

export default function Header({ handleLogout } : { handleLogout: Function }) {
    return (
        <div className="header light-bg mainHeader">
            <div className="flex-row title-gap">
                <img className="pawImgSmall" src={pawImage} alt="Dog paw vector image" />
                <Heading text="FETCH A DOG!" white={true} />
            </div>
            <Button onClick={() => handleLogout()} text="LOGOUT" />
        </div>
    )
}