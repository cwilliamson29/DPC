import type {Income, IncomeErrors} from "~/data/interfaces";

export const getAllTotalIncome = (data: Income[]) => {
    let monthly = 0;
    let yearly = 0;

    data.map((item) => {
        const {year} = getSingletotalIncome(item)
        if (item.payCycleAmountPost) {
            monthly += item.payCycleAmountPost
            yearly += year;
        }

    })
    return {monthly, yearly}
}

export const getSingletotalIncome = (item: Income) => {
    const totalWeeks = item.frequency === "Weekly" ? 52 : item.frequency === "Bi-Weekly" ? 26 : item.frequency === "Monthly" ? 12 : 1
    // @ts-ignore
    const year = item.payCycleAmountPost * totalWeeks;
    // @ts-ignore
    const withheld = (item.payCycleAmountPre - item.payCycleAmountPost) * totalWeeks

    return {year, withheld}
}

export const formatDollar = (amount: number): string => {
    return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
}

interface IncomeValidator {
    income: Income;
    setError: (val: IncomeErrors) => void;
}

export const addIncomeValidator = (income: Income, setError: any) => {
    const e: IncomeErrors = {
        name: false,
        payCycleAmountPre: false,
        payCycleAmountPost: false,
        frequency: false,
        startDate: false,
    };

    if (income.name.length < 1) e.name = true
    if (income.payCycleAmountPre === undefined) e.payCycleAmountPre = true
    if (income.payCycleAmountPost === undefined) e.payCycleAmountPost = true
    if (income.frequency === "") e.frequency = true
    if (income.startDate === "" || income.startDate === undefined) e.startDate = true
    console.log(e)
    setError(e)
}