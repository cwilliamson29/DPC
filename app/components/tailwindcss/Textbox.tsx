interface Props {
    name: string;
    type: string;
    placeHolder: string;
    value: string;
    keyValue: string;
    setter: (val: string) => void
}

function TextBox({name, type, placeHolder, value, keyValue, setter}: Props) {
    return (
        <div className="mb-5 pl-2 flex justify-center w-[100%]">
            <label htmlFor={name} className="block mb-2 text-md font-medium text-right m-1 w-[20%]">{name}</label>
            <input type={type} id={keyValue} value={value} onChange={(e) => setter(e.target.value)}
                   className="border text-white text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 bg-gray-700 border-gray-500 placeholder-gray-400 md:w-1/2 "
                   placeholder={placeHolder} required/>
        </div>
    )
}

export default TextBox