import "./FilterChip.css"

type FilterChipProps = {
    value: string,
    handleDeleteValue: Function
}

export default function FilterChip({ value, handleDeleteValue } : FilterChipProps) {
    return (
        <div className="chip">
            {value}
            <button onClick={() => handleDeleteValue(value)}>X</button>
        </div>
    )
}