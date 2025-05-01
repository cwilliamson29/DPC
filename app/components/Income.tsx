import React, {useState} from 'react'
import useGetData from "~/hooks/useGetData";
import IncomeRender from "~/components/income/IncomeRender";
import ChartRender from "~/components/income/ChartRender";
import AddFormRender from "~/components/income/AddFormRender";

function Income() {
    const [editing, setEditing] = useState<boolean>(false);
    const {data, loading, error} = useGetData("income", editing);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col md:w-[85%] m-5 ">
            <ChartRender data={data}/>

            <IncomeRender data={data} error={error}/>

            <AddFormRender setEditing={() => setEditing(!editing)}/>
        </div>
    )
}

export default Income
