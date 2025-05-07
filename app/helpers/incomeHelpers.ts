import type {Income, IncomeErrors} from "~/data/interfaces";
import {useIncomeStore} from "~/state/incomeStore";

export const getAllTotalIncome = () => {
    const currentIncome = useIncomeStore.use.currentIncome()

    let monthly = 0;
    let yearly = 0;

    currentIncome.map((item) => {
        const {year} = getSingletotalIncome(item)
        if (item.payCycleAmountPost) {
            if (item.frequency === "Weekly") monthly += (item.payCycleAmountPost * 4)
            if (item.frequency === "Bi-Weekly") monthly += (item.payCycleAmountPost * 2)
            if (item.frequency === "Monthly") monthly += item.payCycleAmountPre!
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

export const addIncomeValidator = (income: Income) => {
    let result: IncomeErrors = {
        name: false,
        payCycleAmountPre: false,
        payCycleAmountPost: false,
        frequency: false,
        startDate: false,
    };

    let isError = false

    if (income.name.length < 1) {
        result.name = true
        isError = true
    }
    if (income.payCycleAmountPre === undefined) {
        result.payCycleAmountPre = true
        isError = true
    }
    if (income.payCycleAmountPost === undefined) {
        result.payCycleAmountPost = true
        isError = true
    }
    if (income.frequency === "") {
        result.frequency = true
        isError = true
    }
    if (income.startDate === "" || income.startDate === undefined) {
        result.startDate = true
        isError = true
    }
    // console.log(e)
    // setError(e)
    return {isError, result}
}