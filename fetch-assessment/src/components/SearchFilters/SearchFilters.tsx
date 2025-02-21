import "./SearchFilters.css"
import FilterChip from "../FilterChip/FilterChip"
import Dropdown from "../Dropdown/Dropdown"
import Button from "../Button/Button"
import ChipsDisplay from "../ChipsDisplay/ChipsDisplay"
import { useState, useRef, useEffect } from "react"

type SearchFilterProps = {
    allBreeds: string[],
    handleSearch: Function
}

export default function SearchFilters({ allBreeds, handleSearch } : SearchFilterProps) {
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const sortOrder = useRef<HTMLSelectElement>(null);
    const ageMin = useRef<HTMLInputElement>(null);
    const ageMax = useRef<HTMLInputElement>(null);
    const zipCode = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setBreeds([...allBreeds]);
    }, []);

    const handleAddZipCode = () => {
        if (zipCode.current) {
            const zip = zipCode.current.value;
            if (zip && /^\d{5}$/.test(zip) && !selectedZipCodes.includes(zip)) {
                setSelectedZipCodes((prev) => [...prev, zip]);
                zipCode.current.value = "";
            }
            else {
                alert("Error: Zip code must be a unique, numeric 5-digit code");
            }
        }
    };

    const handleAddBreed = (value: string) => {
        setSelectedBreeds((prev) => [...prev, value]);
        setBreeds((prev) => prev.filter((breed) => value !== breed));
    };

    const handleDeleteZipCode = (value: string) => {
        setSelectedZipCodes((prev) => prev.filter((zip) => zip !== value));
    };

    const handleDeleteBreed = (value: string) => {
        setSelectedBreeds((prev) => prev.filter((breed) => value !== breed));
        setBreeds((prev) => [...prev, value].sort());
    };

    const search = () => {
        if (ageMin.current) {
            const min = Number(ageMin.current.value);
            if (!Number.isInteger(min) || min < 0) {
                alert("Error: Min/Max value must be a non-negative integer");
                return;
            }
        }
        if (ageMax.current) {
            const max = Number(ageMax.current.value);
            if (!Number.isInteger(max) || max < 0) {
                alert("Error: Min/Max value must be a non-negative integer");
                return;
            }
        }
        handleSearch("", sortOrder.current?.value,
            selectedBreeds, selectedZipCodes,
            ageMin.current?.value, ageMax.current?.value);
    }
    
    return (
    <div className="light-bg">
        <div className="center-align filters">
            <div className="flex-col filter-group">
                <label htmlFor="sortOrder">Sort by breed:</label>
                <select id="sortOrder" ref={sortOrder}>
                    <option>Ascending</option>
                    <option>Descending</option>
                </select>
            </div>

            <div className="flex-col filter-group">
                <label htmlFor="ageMin">Age range:</label>
                <input id="ageMin" type="number" name="ageMin" placeholder="Min" ref={ageMin} />
                <input id="ageMax" type="number" name="ageMax" placeholder="Max" ref={ageMax} />
            </div>

            <div className="flex-col filter-group">
                <label htmlFor="zipCode">Add Zip Codes:</label>
                <input id="zipCode" type="string" name="zipCode" placeholder="Zip Code" ref={zipCode} />
                <button className="addBtn" onClick={() => handleAddZipCode()}>Add</button>
            </div>

            <div className="flex-col filter-group">
                <label>Add breeds:</label>
                <Dropdown options={breeds} handleAddValue={handleAddBreed} />
            </div>

            <Button onClick={() => search()} text="Search Dogs" />
        </div>
        <div className="chipDisplayContainers">
            <ChipsDisplay title="Selected Zip Codes:">
                {selectedZipCodes.map((zip) => (<FilterChip key={zip} value={zip} handleDeleteValue={handleDeleteZipCode} />))}
            </ChipsDisplay>
            <ChipsDisplay title="Selected Breeds:">
            {selectedBreeds.map((breed) => (<FilterChip key={breed} value={breed} handleDeleteValue={handleDeleteBreed} />))}
            </ChipsDisplay>
        </div>
    </div>
    )
}