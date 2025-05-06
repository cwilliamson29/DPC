import React, {useEffect, useState} from 'react'
import useGetData from "~/hooks/useGetData";
import IncomeRender from "~/components/income/IncomeRender";
import ChartRender from "~/components/income/ChartRender";
import AddFormRender from "~/components/income/AddFormRender";
import {useIncomeStore} from "~/state/incomeStore";

function Income() {
    const incomeRender = useIncomeStore.getState().renderIncome
    const [editing, setEditing] = useState<boolean>(false);
    const {data, loading, error} = useGetData("income", incomeRender);

    useIncomeStore.getState().setCurrentIncome(data)

    const currentIncome = useIncomeStore.getState().currentIncome

    useEffect(() => {
        console.log("re render")
    }, [incomeRender])

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col md:w-[85%] m-5 ">
            <ChartRender data={data}/>

            <IncomeRender/>

            <AddFormRender setEditing={() => setEditing(!editing)}/>
        </div>
    )
}

export default Income
