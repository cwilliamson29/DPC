import React, {useEffect, useState} from 'react'
import {Chart} from "react-google-charts";
import {formatDollar, getAllTotalIncome} from "~/helpers/incomeHelpers";
import {useIncomeStore} from "~/state/incomeStore";

function ChartRender() {
    const currentIncome = useIncomeStore.use.currentIncome()

    const [dataMonthlyIncome, setDataMonthlyIncome] = useState([]);


    useEffect(() => {
        let result: any = []

        if (currentIncome.length > 0) {
            currentIncome.map((item) => {
                if (item.name && item.payCycleAmountPre) {
                    const val = [item.name, item.payCycleAmountPre]
                    result.push(val)
                }
            })
            result.unshift(["Task", "Monthly Income"])
            setDataMonthlyIncome(result)
        }
    }, [currentIncome]);

    const {yearly, monthly} = getAllTotalIncome()

    return (
        <div className="flex justify-center mb-5">
            {dataMonthlyIncome.length > 0 && (
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
    )
}

export default ChartRender
