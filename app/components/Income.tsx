import React from 'react'
import useGetData from "~/hooks/useGetData";
import IncomeRender from "~/components/income/IncomeRender";
import AddFormRender from "~/components/income/AddFormRender";
import {useIncomeStore} from "~/state/incomeStore";

function Income() {
    const incomeRender = useIncomeStore.use.renderIncome()
    const {data, loading, error} = useGetData("income", incomeRender);
    const setCurrent = useIncomeStore.use.setCurrentIncome()


    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col md:w-[85%] m-5 ">
            {/*<ChartRender/>*/}

            <IncomeRender/>

            <AddFormRender/>
        </div>
    )
}

export default Income
