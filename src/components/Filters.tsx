import { FOOTERFILTERS_BUTTONS } from "../consts"
import { type FilterValue } from "../types.d"

interface Props {
    filterSelected: FilterValue
    onFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({
    filterSelected,
    onFilterChange
}) => {

    return (
        <ul className="filters">
            {
                Object.entries(FOOTERFILTERS_BUTTONS).map(([key , { href, literal}])=>{
                    const isSelected = key === filterSelected
                    const className = isSelected ? 'selected' : ''
                    return (
                        <li key={key}>
                            <a 
                                href={href} 
                                className={className}
                                onClick= {(event)=>{
                                    event.preventDefault()
                                    onFilterChange(key as FilterValue)
                                }}
                            >
                                {literal}
                            </a>
                        </li>
                    )
                })
                
            }
        </ul>
    )}