import createSelectors from "~/state/selectors";
import {create} from "zustand/react";
import {dummyIncome} from "~/data/dummyData/dummyIncome";

class IncomeBase {
    id: number;
    name: string;
    pretax: boolean
    payCycleAmountPre: number;
    payCycleAmountPost: number;
    frequency: string
    startDate: string;

    constructor(id: number, name: string, pretax: boolean, payCycleAmountPre: number, payCycleAmountPost: number, frequency: string, startDate: string) {
        this.id = id;
        this.name = name;
        this.pretax = pretax;
        this.payCycleAmountPre = payCycleAmountPre;
        this.payCycleAmountPost = payCycleAmountPost;
        this.frequency = frequency;
        this.startDate = startDate;
    }

    yearlyAmount(): number {
        return this.payCycleAmountPre * 26
    }
}

interface TaxAmount {
    pre: number;
    post: number;

    amount(): number;
}

const taxAmount: TaxAmount = {
    pre: 1532.38,
    post: 1282.12,
    amount: () => {
        return 100 - ((taxAmount.post / taxAmount.pre) * 100)
    },
}

type IncomeStore = {
    totalIncome: IncomeBase [];
    taxPercent: TaxAmount;
    getIncome: () => void;
    setTotalIncome: (totalIncome: IncomeBase) => void;
}
const incomeStore = create<IncomeStore>((set) => ({
    totalIncome: [],
    taxPercent: taxAmount,
    getIncome: () => {
        const data = dummyIncome

        const result: IncomeBase[] = []
        data.map((m) => {
            const v = new IncomeBase(m.id, m.name, m.pretax, m.payCycleAmountPre, m.payCycleAmountPost, m.frequency, m.startDate);
            result.push(v)
        })

        set(() => ({totalIncome: result}))

    },
    setTotalIncome: (m: any) => {
        if (incomeStore.getState().totalIncome[0].name === "") {
            set(() => ({totalIncome: [m]}));
        } else {
            const v = new IncomeBase(Number(m.id), m.name, m.pretax, Number(m.payCycleAmountPre), Number(m.payCycleAmountPost), m.frequency, m.startDate);
            set((state: any) => ({totalIncome: {...state.totalIncome, v}}));
        }

    }
}))

export const useIncomeStore = createSelectors(incomeStore)