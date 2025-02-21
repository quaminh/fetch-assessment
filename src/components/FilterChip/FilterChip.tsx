import "./FilterChip.css"
import crossIcon from "../../assets/cross.svg"

type FilterChipProps = {
    value: string,
    handleDeleteValue: Function
}

export default function FilterChip({ value, handleDeleteValue } : FilterChipProps) {
    return (
        <div className="chip header">
            {value}
            <img className="crossIcon" src={crossIcon} onClick={() => handleDeleteValue(value)} alt="Cross icon" />
        </div>
    )
}