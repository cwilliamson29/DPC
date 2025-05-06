import createSelectors from "~/state/selectors";
import {create} from "zustand/react";
import type {Income} from "~/data/interfaces";


type IncomeStore = {
    renderIncome: boolean;
    currentIncome?: Income [];
    setRenderIncome: () => void;
    setCurrentIncome: (val: Income[]) => void;
    getIncomeById: (id: number) => Income;
    updateById: (id: number, val: Income) => void;
}
const incomeStore = create<IncomeStore>((set) => ({
    renderIncome: false,
    currentIncome: undefined,
    setRenderIncome: () => {
        set((state) => ({renderIncome: !state.renderIncome}));
    },
    setCurrentIncome: (val: Income[]) => {
        //console.log(val);
        set(() => ({currentIncome: val}));
    },
    getIncomeById: (id: number): Income => incomeStore.getState().currentIncome!.find((x: Income) => x.id === id)!,
    updateById: (id: number, val: Income) => {
        // const res = incomeStore.getState().currentIncome!.filter((x: Income) => x.id !== id)
        // res.push(val)
        const current: Income [] = incomeStore.getState().currentIncome!
        const res = current.map((x: Income) => x.id === id ? val : x);
        set(() => ({currentIncome: res}));
    }
}))

export const useIncomeStore = createSelectors(incomeStore)