import {db} from "~/data/db";

export default function useSaveData<T extends { id?: number }>(val: T, dbStore: string, addToState: (item: T) => void) {

    // @ts-ignore
    db[dbStore].add(val)
        .then((id: number) => {
            val.id = id
            //console.log(val);
            addToState(val)
        })
        .catch((err: Error) => {
            console.log(err);
            //setId(err);
        })
    //return id

}