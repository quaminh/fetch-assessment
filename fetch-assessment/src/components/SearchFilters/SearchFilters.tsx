import "./SearchFilters.css"
import FilterChip from "../FilterChip/FilterChip"
import Dropdown from "../Dropdown/Dropdown"
import { useState, useRef, useEffect } from "react"
import SmallMessage from "../SmallMessage/SmallMessage"

type SearchFilterProps = {
    allBreeds: string[],
    handleSearch: Function
}

export default function SearchFilters({ allBreeds, handleSearch } : SearchFilterProps) {
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
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
                setErrorMessage("");
            }
            else {
                setErrorMessage("Error: Zip code must be a unique, numeric 5-digit code");
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
                setErrorMessage("Error: Min/Max value must be a non-negative integer");
                return;
            }
        }
        if (ageMax.current) {
            const max = Number(ageMax.current.value);
            if (!Number.isInteger(max) || max < 0) {
                setErrorMessage("Error: Min/Max value must be a non-negative integer");
                return;
            }
        }
        setErrorMessage("");
        handleSearch("", sortOrder.current?.value,
            selectedBreeds, selectedZipCodes,
            ageMin.current?.value, ageMax.current?.value);
    }
    
    return (
    <>
        <select ref={sortOrder}>
            <option>Ascending</option>
            <option>Descending</option>
        </select>
        <input type="number" name="ageMin" placeholder="Min" ref={ageMin} />
        <input type="number" name="ageMax" placeholder="Max" ref={ageMax} />
        <input type="string" name="zipCode" placeholder="Zip Code" ref={zipCode} />
        <button onClick={() => handleAddZipCode()}>Add</button>
        <button onClick={() => search()}>Search Dogs</button>
        <div>
            {selectedZipCodes.map((zip) => (<FilterChip key={zip} value={zip} handleDeleteValue={handleDeleteZipCode} />))}
        </div>
        <Dropdown options={breeds} handleAddValue={handleAddBreed} />
        <div>
            {selectedBreeds.map((breed) => (<FilterChip key={breed} value={breed} handleDeleteValue={handleDeleteBreed} />))}
        </div>
        {errorMessage !== "" && <SmallMessage text={errorMessage} error={true} />}
    </>
    )
}