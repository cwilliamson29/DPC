export interface Income {
    id: number;
    name: string;
    pretax: boolean;
    payCycleAmountPre: number;
    payCycleAmountPost: number;
    frequency: string;
    startDate: string;
}

export const dummyIncome: Income[] = [{
    id: 0,
    name: "My Income",
    pretax: true,
    payCycleAmountPre: 1532.38,
    payCycleAmountPost: 1282.12,
    frequency: "Bi-Weekly",
    startDate: ""
}]