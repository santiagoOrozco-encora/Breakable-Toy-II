import { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    type: string;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, id, type, placeholder, ...props }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor={id} className="text-md font-medium text-end w-1/4">{label}</label>
            <input type={type} id={id} placeholder={placeholder || ''} {...props} className="border border-gray-300 rounded-md p-2 w-3/4"/>
        </div>
    )
}

export default Input
