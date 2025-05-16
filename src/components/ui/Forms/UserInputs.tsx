import { InputProps, SelecteProps, TextAreaProps } from "@/types/propTypes";

export const Input = ({fontColor, label, type, multiple, placeholder, name,textColor, disabled, value, onChange } : InputProps) => {
    return (
        <div className="text-sm flex flex-col w-full">
            <label className={`text-sm ${fontColor}`}>{label}</label>
            <input
                type={type}
                name={name}
                multiple={multiple}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full border border-gray-300 rounded-md p-2 ${textColor} transitions`}
                disabled={disabled}
                
            />
        </div>
    );
}

export const InputDate = ({fontColor, label, type, multiple, placeholder, name,textColor, disabled, value, onChange } : InputProps) => {
    return (
        <div className="text-sm flex flex-col w-full">
            <label className={`text-sm ${fontColor}`}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full border border-gray-300 rounded-md p-2 ${textColor} transitions`}
                disabled={disabled}
            />
        </div>
    );
}

export const Select = ({ label, selection_name, name, value, options, onChange } : SelecteProps<string | number | [] | undefined>) => {
    return (
        <div className="text-sm flex flex-col w-full">
            <label className="text-sm">{label}</label>
            <select name={name} value={value} onChange={onChange} className="w-full text-black truncate border border-gray-300 rounded-md p-2">
                <option value={0} className="truncate">
                   {selection_name}
                </option>
                {options && options.map((option, index) => <option className="truncate" key={index} value={option?.value}>{option?.title}</option>)}
                
            </select>
        </div>
    )
}

export const TextArea = ({disabled, name, label, fontColor, textColor, placeholder, onChange, value, rows } : TextAreaProps) => {
  return (
    <div className='text-sm w-full'>
      <label className={`text-sm ${fontColor}`}>{label}</label>
      <textarea
        
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        rows={rows}
        disabled={disabled}
        className={`w-full border border-gray-300 rounded-md p-2 ${textColor} transitions`}
      />
    </div>
  );
};