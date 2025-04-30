import React, {useEffect, useState} from 'react'
import Card from "~/components/tailwindcss/Card";
import Textbox from "~/components/tailwindcss/Textbox";
import useGetData from "~/hooks/useGetData";
import type {Income} from "~/data/interfaces";
import {Chart} from "react-google-charts";
import SelectBox from "~/components/tailwindcss/SelectBox";
import useSaveData from "~/hooks/useSaveData";
import {formatDollar, getAllTotalIncome, getSingletotalIncome} from "~/helpers/incomeHelpers";

function Income() {
    const [editing, setEditing] = useState<boolean>(false);
    const {data, loading, error} = useGetData("income", editing);
    const {yearly, monthly} = getAllTotalIncome(data)
    const [dataMonthlyIncome, setDataMonthlyIncome] = useState([]);
    // input state
    const [amount, setAmount] = useState<Income>({
        name: "",
        payCycleAmountPre: undefined,
        payCycleAmountPost: undefined,
        frequency: "",
        startDate: ""
    })

    useEffect(() => {
        let result: any = []
        data.map((item) => {
            if (item.name && item.payCycleAmountPre) {
                const val = [item.name, item.payCycleAmountPre]
                result.push(val)
            }
        })
        result.unshift(["Task", "Monthly Income"])
        setDataMonthlyIncome(result)
    }, [editing, data]);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col md:w-[85%] m-5 ">
            <button onClick={() => console.log(amount)}>consollog</button>
            <div className="flex justify-center mb-5">
                {dataMonthlyIncome.length > 1 && (
                    <div className="rounded-md overflow-hidden w-[50%] bg-white">
                        <Chart chartType={"PieChart"} data={dataMonthlyIncome} options={{title: "Income from all sources"}} width={"100%"}/>
                        <div className="text-black text-center">
                            <label className="text-lg font-bold">Income From All Sources:</label>
                            <div className="flex justify-around">
                                <div className="font-bold text-green-800">
                                    Montly After Tax: {formatDollar(monthly)}
                                </div>
                                <div className="font-bold text-green-800">
                                    Yearly Before Tax: {formatDollar(yearly)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className="grid grid-cols-2 gap-4 place-items-center mb-5">
                {data.map((item, i) => {
                    const {year, withheld} = getSingletotalIncome(item)

                    return (
                        <Card key={i} title={item.name} colorOptions={{title: "bg-green-700", body: "bg-green-100", text: "text-black"}}>
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
            <div className="flex w-[100%]  justify-center ">
                <Card title={"Add income"} width={"w-full md:w-2xl"}>
                    <div className="flex flex-col w-[100%] p-1">
                        <form className="flex flex-col w-[100%] items-center"
                              onSubmit={(e) => {
                                  e.preventDefault();
                                  useSaveData(amount, "income")
                                  setEditing(!editing)
                              }}>
                            <Textbox name={"Name: "} type={"text"} placeHolder={"My Income"} value={amount.name}
                                     keyValue={""}
                                     setter={(val) => setAmount({...amount, name: val})}/>
                            <Textbox name={"Pre Tax: "} type={"number"} placeHolder={"$2,023"}
                                     value={amount.payCycleAmountPre !== undefined ? amount.payCycleAmountPre.toString() : ""}
                                     keyValue={""}
                                     setter={(val) => setAmount({...amount, payCycleAmountPre: Number(val)})}/>
                            <Textbox name={"After Tax: "} type={"number"} placeHolder={"$2,340"}
                                     value={amount.payCycleAmountPost !== undefined ? amount.payCycleAmountPost.toString() : ""}
                                     keyValue={""}
                                     setter={(val) => setAmount({...amount, payCycleAmountPost: Number(val)})}/>
                            <SelectBox name={"Pay Frequency: "} arr={["Weekly", "Bi-Weekly", "Monthly"]} error={false} value={amount.frequency}
                                       setter={(val) => setAmount({...amount, frequency: val})}/>
                            <Textbox name={"Last Pay Date: "} type={"date"} placeHolder={""} value={amount.startDate} keyValue={""}
                                     setter={(val) => setAmount({...amount, startDate: val})}/>

                            <button type="submit" className="bg-green-900 text-white rounded-xl p-3 px-10 hover:bg-green-800 cursor-pointer">Add Income
                            </button>
                        </form>

                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Income
