import React, {useEffect, useState} from 'react'
import {useIncomeStore} from "~/state/incomeStore";
import Card from "~/components/tailwindcss/Card";

function Income() {
    const [editing, setEditing] = useState<boolean>(false);
    const getIncome = useIncomeStore.use.getIncome()

    useEffect(() => {
        getIncome()
    }, []);

    const income = useIncomeStore.use.totalIncome()

    const formatDollar = (amount: number): string => {
        return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
    }

    return (
        <div className="flex flex-row w-[100%] justify-center mt-5">
            <div className="">
                {income.map((item, i) => (
                    <Card key={i} title={item.name}>
                        <div className="flex flex-row">
                            <div>Yearly amount: {formatDollar(item.yearlyAmount())}</div>
                        </div>
                        <div>
                            <div>{item.frequency} amount: {formatDollar(item.payCycleAmountPost)}</div>
                        </div>
                    </Card>

                ))}
            </div>

        </div>
    )
}

export default Income
