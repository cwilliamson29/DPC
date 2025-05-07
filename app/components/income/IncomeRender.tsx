import React, {useState} from 'react'
import Card from "~/components/tailwindcss/Card";
import useModifyData from "~/hooks/useModifyData";
import EditIncome from "~/components/income/EditIncome";
import SingleIncomeRender from "~/components/income/SingleIncomeRender";
import {useIncomeStore} from "~/state/incomeStore";

function IncomeRender() {
    const currentIncome = useIncomeStore.use.currentIncome()
    const renderIncome = useIncomeStore.use.renderIncome()
    // const {currentIncome} = useIncomeStore((state) => ({currentIncome: state.currentIncome}))
    const removeIncomeFromState = useIncomeStore.use.removeIncome()

    const colorOptions = {
        title: "bg-green-700",
        body: "bg-green-100",
        text: "text-black",
        border: "border-green-700"
    }

    const deleteData = (id: number) => {
        useModifyData(id, "income", "delete")
        removeIncomeFromState(id)
    }

    // useEffect(() => {
    //     //console.log("inside income render")
    // }, [renderIncome])

    //console.log(currentIncome)

    if (renderIncome) {
        return (
            <div>Loading....</div>
        )
    }
    return (
        <div className="grid grid-cols-2 gap-4 place-items-center mb-5">
            {currentIncome.map((item, i) => {
                const [edit, setEdit] = useState(false);

                const options = {
                    id: item.id!,
                    setEditing: () => setEdit(!edit),
                    setDelete: (id: number) => deleteData(id),
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
