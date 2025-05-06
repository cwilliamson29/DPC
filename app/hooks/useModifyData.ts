import {db} from "~/data/db";

export default function useModifyData<T>(id: number, dbStore: string, dbAction: string, data?: T) {

    if (dbAction === "delete") {
        // @ts-ignore
        db[dbStore].where("id").equals(id).delete()
            .catch((err: any) => console.log(err));
    }

    if (dbAction === "update") {
        // @ts-ignore
        db[dbStore].update(id, data)
            .catch((err: any) => console.log(err));
    }
    // @ts-ignore
    // db[dbStore][dbAction](val)
    //     .catch((err: Error) => console.log(err.message))
}