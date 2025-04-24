import {useEffect, useState} from "react";
import {dummyIncome, type Income} from "~/data/dummyData/dummyIncome";

const useIncome = () => {
    const [data, setData] = useState<Income []>([])
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        //const controller = new AbortController()
        setLoading(true)

        setData(dummyIncome)

        setLoading(false)
    }, [])

    return {data, error, loading}
}
export default useIncome;