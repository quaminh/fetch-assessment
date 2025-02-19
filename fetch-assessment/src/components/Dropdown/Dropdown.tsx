import "./Dropdown.css"
import { useState } from "react"

type DropdownProps = {
    options: string[],
    handleAddValue: Function
}

export default function Dropdown({ options, handleAddValue } : DropdownProps) {
    const [focused, setFocused] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>(""); 

    return (
        <div className="dropdown" onClick={() => setFocused(!focused)}>
            <input type="text" placeholder="Search Breeds..." onChange={(e) => setSearchValue(e.target.value)} />
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