import React, {useState} from 'react'
import {formatDollar, getSingletotalIncome} from "~/helpers/incomeHelpers";
import Card from "~/components/tailwindcss/Card";
import type {Income} from "~/data/interfaces";

interface Props {
    data: Income[];
    error: Error | null;
}

function IncomeRender({data, error}: Props) {
    const [edit, setEdit] = useState(false);
    return (
        <div className="grid grid-cols-2 gap-4 place-items-center mb-5">
            {data.map((item, i) => {
                const {year, withheld} = getSingletotalIncome(item)
                const colorOptions = {
                    title: "bg-green-700",
                    body: "bg-green-100",
                    text: "text-black",
                }
                const options = {
                    setEdit: () => setEdit(!edit),
                    edit: edit,
                }
                return (
                    <Card key={i} title={item.name} colorOptions={colorOptions}>
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
                                    <div className="text-lg font-bold w-[40%] text-right">{item.frequency} Amount:</div>
                                    <div className="text-lg font-bold w-[60%] pl-3 text-green-900">{item.payCycleAmountPost && formatDollar(item.payCycleAmountPost)}</div>
                                </div>
                            </div>
                        </div>

                    </Card>
                )
            })}
            {error && <div className="bg-red-500 text-black">{error.message}</div>}
        </div>
    )
}

export default IncomeRender
