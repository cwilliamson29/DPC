import React from 'react'
import {useIncomeStore} from "~/state/incomeStore";

function Income() {
    const income = useIncomeStore.use.TotalIncome()
    return (
        <div>
            {income.map((item, i) => (
                <div key={i}>{item.name}: {item.amount}</div>
            ))}
        </div>
    )
}

export default Income
