import React, {useEffect, useState} from 'react'
import {formatDollar, getSingletotalIncome} from "~/helpers/incomeHelpers";
import {useIncomeStore} from "~/state/incomeStore";

interface Props {
    id: number;
    edit: boolean;
}

function SingleIncomeRender({id, edit}: Props) {
    const renderIncome = useIncomeStore.getState().renderIncome
    const [data, setData] = useState(useIncomeStore.getState().getIncomeById(id))
    const {year, withheld} = getSingletotalIncome(data)

    useEffect(() => {
        setData(useIncomeStore.getState().getIncomeById(id))
        console.log("in singleincome render")
    }, [edit])

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

export default SingleIncomeRender
