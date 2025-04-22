import createSelectors from "~/state/selectors";
import {create} from "zustand/react";

interface Income {
    name: string;
    amount: number;
    frequency: string
}

const initialIncome: Income = {
    name: "test",
    amount: 10000,
    frequency: "weekly",
}

type IncomeStore = {
    TotalIncome: Income [];
    setTotalIncome: (totalIncome: Income) => void;
}
const incomeStore = create<IncomeStore>((set) => ({
    TotalIncome: [initialIncome],
    setTotalIncome: (income: Income) => {
        if (incomeStore.getState().TotalIncome[0].name === "") {
            set(() => ({TotalIncome: [income]}));
        } else {
            set((state: any) => ({TotalIncome: {...state.TotalIncome, income}}));
        }

    }
}))

export const useIncomeStore = createSelectors(incomeStore)