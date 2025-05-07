import createSelectors from "~/state/selectors";
import {create} from "zustand/react";
import type {Income} from "~/data/interfaces";


type IncomeStore = {
    renderIncome: boolean;
    currentIncome: Income [];
    setRenderIncome: () => void;
    setCurrentIncome: (val: Income[]) => void;
    getIncomeById: (id: number) => Income;
    updateById: (id: number, val: Income) => void;
    addIncome: (val: Income) => void;
    removeIncome: (id: number) => void;
}
const incomeStore = create<IncomeStore>((set) => ({
    renderIncome: false,
    currentIncome: [],
    setRenderIncome: () => {
        set((state) => ({renderIncome: state.renderIncome}));
    },
    setCurrentIncome: (val: Income[]) => {
        //console.log(val);
        set(() => ({currentIncome: val}));
    },
    getIncomeById: (id: number): Income => incomeStore.getState().currentIncome.find((x: Income) => x.id === id)!,
    updateById: (id: number, val: Income) => {
        // const res = incomeStore.getState().currentIncome!.filter((x: Income) => x.id !== id)
        // res.push(val)
        const current: Income [] = incomeStore.getState().currentIncome
        const result = current.map((x: Income) => x.id === id ? val : x);
        set(() => ({currentIncome: result}));
    },
    addIncome: (val: Income) => {
        const current: Income[] = incomeStore.getState().currentIncome
        const result: Income[] = [...current, val];
        console.log(result);
        set(() => ({currentIncome: result}));
    },
    removeIncome: (id: number) => {
        const result = incomeStore.getState().currentIncome
        const newInc = result.filter((x: Income) => x.id !== id)
        console.log(id);
        console.log(newInc)
        set(() => ({currentIncome: newInc}));
    }
}))

export const useIncomeStore = createSelectors(incomeStore)