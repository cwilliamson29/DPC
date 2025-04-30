import type {Income} from "~/data/interfaces";

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