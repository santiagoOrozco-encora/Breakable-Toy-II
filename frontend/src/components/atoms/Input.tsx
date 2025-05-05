interface InputProps {
    label: string;
    id: string;
    type: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value?: string;
    options?: { value: string; label: string }[];
}

const Input: React.FC<InputProps> = ({ label, id, type, placeholder, onChange, value, options, ...rest }) => {
    if(type === 'select') {
        return (
            <div className="flex flex-row gap-2 items-center">
                <label htmlFor={id} className="text-md font-medium text-end w-1/4">{label}</label>
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange?.(e)}
                    className={`border border-gray-300 rounded-md p-2 w-3/4`}
                    {...rest}
                >
                    <option value="">{placeholder}</option>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        )
    }else{
        return (
            <div className={`flex flex-row items-center gap-2`}>
                <label htmlFor={id} className="text-md font-medium text-end w-1/4">{label}</label>
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder || ''}
                    value={value}
                    onChange={(e) => onChange?.(e)}
                    className={`border border-gray-300 rounded-md p-2 ${type === 'checkbox' ? 'w-4 h-4' : 'w-3/4'}`}
                    {...rest}
                />
            </div>
        )
    }
}

export default Input
