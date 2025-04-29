import {useEffect, useState} from "react";
import {type Income} from "~/data/dummyData/dummyIncome";
import {db} from "~/data/db";

const useIncome = (deps?: boolean) => {
    const [data, setData] = useState<Income []>([])
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)

        db.income.toArray()
            .then(res => {
                setData(res)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [deps])


    return {data, error, loading}
}
export default useIncome;

export const addIncome = (val: Income) => {
    db.income.add(val)
        .catch(err => console.log(err))
}