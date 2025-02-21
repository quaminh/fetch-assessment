import "./Dropdown.css"
import { useState } from "react"
import arrowIcon from "../../assets/arrow.svg"

type DropdownProps = {
    options: string[],
    handleAddValue: Function
}

export default function Dropdown({ options, handleAddValue } : DropdownProps) {
    const [focused, setFocused] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>(""); 

    return (
        <div className="dropdown" onClick={() => setFocused(!focused)}>
            <div className="flex-row">
                <input type="text" placeholder="Search Breeds..." onChange={(e) => setSearchValue(e.target.value)} />
                <button className="dropdownBtn"><img className={`arrowIcon ${focused ? "up" : "down"}`} src={arrowIcon} alt="Dropdown arrow icon" /></button>
            </div>
            {focused &&
                <ul className="options">
                    {options.filter((option) => option.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((option) => (<li key={option} className="item" onClick={() => handleAddValue(option)}>{option}</li>
                    ))}
                </ul>
            }
        </div>
    )
}