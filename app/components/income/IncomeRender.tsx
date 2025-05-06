import React, {useEffect, useState} from 'react'
import Card from "~/components/tailwindcss/Card";
import type {Income} from "~/data/interfaces";
import useModifyData from "~/hooks/useModifyData";
import EditIncome from "~/components/income/EditIncome";
import SingleIncomeRender from "~/components/income/SingleIncomeRender";
import {useIncomeStore} from "~/state/incomeStore";

interface Props {
    data: Income;
    error: Error | null;
}

function IncomeRender() {
    const currentIncome = useIncomeStore.getState().currentIncome

    const colorOptions = {
        title: "bg-green-700",
        body: "bg-green-100",
        text: "text-black",
        border: "border-green-700"
    }

    useEffect(() => {
        console.log("inside income render")
    }, [])

    return (
        <div className="grid grid-cols-2 gap-4 place-items-center mb-5">
            {currentIncome!.map((item, i) => {
                const [edit, setEdit] = useState(false);

                const options = {
                    id: item.id!,
                    setEditing: () => setEdit(!edit),
                    setDelete: (id: number) => useModifyData(id, "income", "delete"),
                    edit: edit,
                    showEdit: true,
                }
                return (
                    <Card key={item.id} title={item.name} colorOptions={colorOptions} options={options}>
                        {edit ? <EditIncome id={item.id!} setEditing={() => setEdit(!edit)}/> : <SingleIncomeRender id={item.id!} edit={edit}/>}
                    </Card>
                )
            })}
        </div>

    )
}

export default IncomeRender
