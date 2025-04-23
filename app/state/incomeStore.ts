import createSelectors from "~/state/selectors";
import {create} from "zustand/react";

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

const initialIncome = new IncomeBase(
    0,
    "My Income",
    true,
    1532.38,
    1282.12,
    "Bi-Weekly",
    ""
)

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
    setTotalIncome: (totalIncome: IncomeBase) => void;
}
const incomeStore = create<IncomeStore>((set) => ({
    totalIncome: [initialIncome],
    taxPercent: taxAmount,
    setTotalIncome: (income: IncomeBase) => {
        if (incomeStore.getState().totalIncome[0].name === "") {
            set(() => ({totalIncome: [income]}));
        } else {
            set((state: any) => ({totalIncome: {...state.totalIncome, income}}));
        }

    }
}))

export const useIncomeStore = createSelectors(incomeStore)