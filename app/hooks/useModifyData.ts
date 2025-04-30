import {db} from "~/data/db";

export default function useModifyData<T>(val: T, dbStore: string) {
    const dbAction = "add"

    // @ts-ignore
    db[dbStore][dbAction](val)
        .catch((err: Error) => console.log(err.message))
}