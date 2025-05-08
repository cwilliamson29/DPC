import React from 'react'
import {useIncomeStore} from "~/state/incomeStore";
import IncomeCardRender from "~/components/income/IncomeCardRender";
import type {Income} from "~/data/interfaces";

function IncomeRender() {
    const currentIncome = useIncomeStore.use.currentIncome()

    return (
        <div className="grid grid-cols-2 gap-4 place-items-center mb-5">
            {currentIncome.map((item: Income) => {
                return (
                    <IncomeCardRender key={item.id} item={item}/>
                )
            })}

        </div>

    )
}

export default IncomeRender
