import React, {useState} from 'react'
import Card from "~/components/tailwindcss/Card";
import Textbox from "~/components/tailwindcss/Textbox";
import SelectBox from "~/components/tailwindcss/SelectBox";
import type {Income, IncomeErrors} from "~/data/interfaces";
import {addIncomeValidator} from "~/helpers/incomeHelpers";

interface Props {
    setEditing: () => void;
}

function AddFormRender({setEditing}: Props) {
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
    const handleSubmit = (e: any) => {
        e.preventDefault();
        addIncomeValidator(amount, (val: IncomeErrors) => setErrors(val))
        console.log("done")
        // useSaveData(amount, "income")
        // setEditing()
    }

    return (
        <div className="flex w-[100%]  justify-center ">
            <Card title={"Add income"} width={"w-full md:w-2xl"}>
                <div className="flex flex-col w-[100%] p-1">
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

                </div>
            </Card>
        </div>
    )
}

export default AddFormRender
