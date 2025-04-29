interface Props {
    name: string;
    arr: string[];
    error: boolean;
    value: string;
    setter: (val: string) => void;
}

function SelectBox({name, arr, error, value, setter}: Props) {
    const noError = "border text-white text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 bg-gray-700 border-gray-500 placeholder-gray-400 md:w-1/2 "
    const hasError = "bg-red-500 border border-red-500 text-red-900 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"

    return (
        <div className="mb-5 pl-2 flex justify-center w-[100%]">
            <label className="block mb-2 text-md font-medium text-right m-1 w-[20%]">{name}</label>
            <select id="shiftStart"
                    className={error ? hasError : noError}
                    value={value}
                    onChange={(e) => setter(e.target.value)} required>
                <option value=""></option>
                {arr.map((arrOption) => <option key={arrOption} value={arrOption}>{arrOption}</option>)}
            </select>
        </div>
    )
}

export default SelectBox