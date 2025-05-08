import React, {useState} from 'react'
import Card from "~/components/tailwindcss/Card";
import EditIncome from "~/components/income/EditIncome";
import SingleIncomeRender from "~/components/income/SingleIncomeRender";
import type {Income} from "~/data/interfaces";
import useModifyData from "~/hooks/useModifyData";
import {useIncomeStore} from "~/state/incomeStore";

interface Props {
    item: Income;
}

function IncomeCardRender({item}: Props) {
    const removeIncomeFromState = useIncomeStore.use.removeIncome()
    const [edit, setEdit] = useState(false);

    const colorOptions = {
        title: "bg-green-700",
        body: "bg-green-100",
        text: "text-black",
        border: "border-green-700"
    }

    const options = {
        id: item.id!,
        setEditing: () => setEdit(!edit),
        setDelete: (id: number) => deleteData(id),
        edit: edit,
        showEdit: true,
    }

    const deleteData = (id: number) => {
        useModifyData(id, "income", "delete")
        removeIncomeFromState(id)
    }

    return (
        <Card title={item.name} colorOptions={colorOptions} options={options}>
            {edit ? <EditIncome id={item.id!} setEditing={() => setEdit(!edit)}/> : <SingleIncomeRender id={item.id!} edit={edit}/>}
        </Card>


    )
}

export default IncomeCardRender
