import {db} from "~/data/db";

export default function useSaveData<T>(val: T, dbStore: string) {
    // @ts-ignore
    db[dbStore].add(val)
        .catch((err: Error) => console.log(err.message))
}