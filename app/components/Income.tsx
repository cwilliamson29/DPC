import React from 'react'
import {useIncomeStore} from "~/state/incomeStore";
import Card from "~/components/tailwindcss/Card";

function Income() {
    const income = useIncomeStore.use.totalIncome()

    const formatDollar = (amount: number): string => {
        return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
    }

    return (
        <div>
            {income.map((item, i) => (
                <Card key={i} title={item.name}>
                    <div>Yearly amount: {formatDollar(item.yearlyAmount())}</div>
                    <div>{item.frequency} amount: {formatDollar(item.payCycleAmountPost)}</div>
                </Card>

            ))}
        </div>
    )
}

export default Income
