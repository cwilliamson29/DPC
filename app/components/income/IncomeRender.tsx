import React, {useState} from 'react'
import {formatDollar, getSingletotalIncome} from "~/helpers/incomeHelpers";
import Card from "~/components/tailwindcss/Card";
import type {Income, IncomeErrors} from "~/data/interfaces";
import Textbox from "~/components/tailwindcss/Textbox";
import SelectBox from "~/components/tailwindcss/SelectBox";
import useModifyData from "~/hooks/useModifyData";

interface Props {
    data: Income;
    error: Error | null;
}

function IncomeRender({data, error}: Props) {
    const [edit, setEdit] = useState(false);
    const {year, withheld} = getSingletotalIncome(data)
    const colorOptions = {
        title: "bg-green-700",
        body: "bg-green-100",
        text: "text-black",
        border: "border-green-700"
    }
    const options = {
        setEditing: () => setEdit(!edit),
        setDelete: (id: number) => useModifyData(id, "income", "delete"),
        edit: edit,
        showEdit: true,
    }
    const [errors, setErrors] = useState<IncomeErrors>({
        name: false,
        payCycleAmountPre: false,
        payCycleAmountPost: false,
        frequency: false,
        startDate: false,
    });
    const [amount, setAmount] = useState<Income>({
        name: "",
        payCycleAmountPre: undefined,
        payCycleAmountPost: undefined,
        frequency: "",
        startDate: ""
    })
    const NoEditData = () => {
        return (
            <div className="w-full">
                <div className="">
                    <div className=" flex w-full">
                        <div className="w-[40%] text-right">Pre-tax Yearly:</div>
                        <div className="w-[60%] pl-3 text-green-900">{formatDollar(year)}</div>
                    </div>
                    <div className=" flex w-full">
                        <div className="text-sm text-right w-[40%]">Amount withheld:</div>
                        <div className=" w-[40%] pl-3 text-red-600">{formatDollar(withheld)}</div>
                    </div>
                    <div className=" flex w-full">
                        <div className="text-lg font-bold w-[40%] text-right">Yearly Amount:</div>
                        <div className="text-lg font-bold w-[60%] pl-3 text-green-900">{formatDollar(year - withheld)}</div>
                    </div>
                </div>
                <div>
                    <div className=" flex w-full">
                        <div className="text-lg font-bold w-[40%] text-right">{data.frequency} Amount:</div>
                        <div className="text-lg font-bold w-[60%] pl-3 text-green-900">{data.payCycleAmountPost && formatDollar(data.payCycleAmountPost)}</div>
                    </div>
                </div>
            </div>
        )
    }
    const EditData = () => {
        return (
            <form className="flex flex-col w-[100%] items-center"
                  onSubmit={(e) => handleSubmit(e)}>
                <Textbox name={"Name: "} type={"text"} placeHolder={"My Income"} value={amount.name}
                         keyValue={""} error={errors.name}
                         setter={(val) => setAmount({...amount, name: val})}/>
                <Textbox name={"Pre Tax: "} type={"number"} placeHolder={"$2,023"}
                         value={amount.payCycleAmountPre !== undefined ? amount.payCycleAmountPre.toString() : ""}
                         keyValue={""} error={errors.payCycleAmountPre}
                         setter={(val) => setAmount({...amount, payCycleAmountPre: Number(val)})}/>
                <Textbox name={"After Tax: "} type={"number"} placeHolder={"$2,340"}
                         value={amount.payCycleAmountPost !== undefined ? amount.payCycleAmountPost.toString() : ""}
                         keyValue={""} error={errors.payCycleAmountPost}
                         setter={(val) => setAmount({...amount, payCycleAmountPost: Number(val)})}/>
                <SelectBox name={"Pay Frequency: "} arr={["Weekly", "Bi-Weekly", "Monthly"]} error={false} value={amount.frequency}
                           setter={(val) => setAmount({...amount, frequency: val})}/>
                <Textbox name={"Last Pay Date: "} type={"date"} placeHolder={""} value={amount.startDate}
                         keyValue={""} error={errors.frequency}
                         setter={(val) => setAmount({...amount, startDate: val})}/>

                <button type="submit" className="bg-green-900 text-white rounded-xl p-3 px-10 hover:bg-green-800 cursor-pointer">Add Income
                </button>
            </form>
        )
    }

    return (
        <div>
            <Card id={data.id !== undefined ? data.id : 0} title={data.name} colorOptions={colorOptions} options={options}>
                {edit ? <EditData/> : <NoEditData/>}
            </Card>
            {error && <div className="bg-red-500 text-black">{error.message}</div>}
        </div>
    )
}

export default IncomeRender
