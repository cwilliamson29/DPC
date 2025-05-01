import {useEffect, useState} from "react";
import {type Income} from "~/data/interfaces";
import {db} from "~/data/db";

const useGetData = (dbStore: string, deps?: boolean) => {
    const [data, setData] = useState<Income []>([])
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)

        // @ts-ignore
        db[dbStore].toArray()
            .then((res: any) => {
                setData(res)
                setLoading(false)
            })
            .catch((err: any) => {
                setError(err)
                setLoading(false)
            })
    }, [deps])


    return {data, error, loading}
}
export default useGetData;
