interface Props {
    name: string;
    type: string;
    placeHolder: string;
    value: string;
    keyValue: string;
    error: boolean
    setter: (val: string) => void
}

function TextBox({name, type, placeHolder, value, keyValue, error, setter}: Props) {
    return (
        <div className="mb-2 pl-2 flex justify-center w-[100%]">
            <label htmlFor={name} className="block mb-2 text-md font-medium text-right m-1 w-[20%]">{name}</label>
            <div className=" md:w-1/2">
                <input type={type} id={keyValue} value={value} onChange={(e) => setter(e.target.value)}
                       className={(error && "border-red-600 ") + "border text-white rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 bg-gray-700 border-gray-500 placeholder-gray-400 md:w-full"}
                       placeholder={placeHolder} required/>
                {error && <span className="text-red-500 text-xs">*Required</span>}
            </div>
        </div>
    )
}

export default TextBox