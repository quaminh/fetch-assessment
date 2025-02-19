import "./SearchFilters.css"
import FilterChip from "../FilterChip/FilterChip"
import Dropdown from "../Dropdown/Dropdown"
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

    const addZipCode = () => {
        if (zipCode.current) {
            const zip = zipCode.current.value;
            if (zip && /^\d{5}$/.test(zip) && !selectedZipCodes.includes(zip)) {
                setSelectedZipCodes((prev) => [...prev, zip]);
                zipCode.current.value = "";
            }
        }
    };

    const handleAddBreed = (value: string) => {
        setSelectedBreeds((prev) => [...prev, value]);
        setBreeds((prev) => prev.filter((breed) => value !== breed));
        console.log(selectedBreeds, breeds);
    };

    const handleDeleteZipCode = (value: string) => {
        setSelectedZipCodes((prev) => prev.filter((zip) => zip !== value));
    };

    const handleDeleteBreed = (value: string) => {
        setSelectedBreeds((prev) => prev.filter((breed) => value !== breed));
        setBreeds((prev) => [...prev, value].sort());
    };
    
    return (
    <>
        <select>
            {allBreeds.map((breed) => (<option>{breed}</option>))}
        </select>
        <select ref={sortOrder}>
            <option>Ascending</option>
            <option>Descending</option>
        </select>
        <input type="number" name="ageMin" placeholder="Min" ref={ageMin} />
        <input type="number" name="ageMax" placeholder="Max" ref={ageMax} />
        <input type="string" name="zipCode" placeholder="Zip Code" ref={zipCode} />
        <button onClick={() => addZipCode()}>Add</button>
        <button onClick={() => handleSearch("", sortOrder.current?.value,
            selectedBreeds, selectedZipCodes,
            ageMin.current?.value, ageMax.current?.value)}>Search Dogs</button>
        <div>
            {selectedZipCodes.map((zip) => (<FilterChip value={zip} handleDeleteValue={handleDeleteZipCode} />))}
        </div>
        <Dropdown options={breeds} handleAddValue={handleAddBreed} />
        <div>
            {selectedBreeds.map((breed) => (<FilterChip value={breed} handleDeleteValue={handleDeleteBreed} />))}
        </div>
        <button onClick={() => console.log(ageMin.current?.value)}>ageMin</button>
        <button onClick={() => console.log(ageMax.current?.value)}>ageMax</button>
        <button onClick={() => console.log(selectedZipCodes)}>zipCode</button>
        <button onClick={() => console.log(sortOrder.current?.value)}>sortOrder</button>
    </>
    )
}