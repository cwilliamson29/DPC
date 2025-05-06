import createSelectors from "~/state/selectors";
import {create} from "zustand/react";


type IncomeStore = {
    renderIncome: boolean;
    setRenderIncome: () => void;
}
const incomeStore = create<IncomeStore>((set) => ({
    renderIncome: false,
    setRenderIncome: () => {
        set((state) => ({renderIncome: !state.renderIncome}));
    },
}))

export const useIncomeStore = createSelectors(incomeStore)