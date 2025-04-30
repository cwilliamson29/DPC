import Dexie, {type EntityTable} from "dexie";
import type {Income} from "~/data/dummyData/dummyIncome";

export const db = new Dexie("DebtDatabase") as Dexie & {
    income: EntityTable<Income, "id">;
};

// Schema declaration:
db.version(1).stores({
    income:
        "++id, name, payCycleAmountPre, payCycleAmountPost, frequency, startDate",
});


