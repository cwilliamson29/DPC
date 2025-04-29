export interface Income {
    id?: number;
    name: string;
    payCycleAmountPre?: number;
    payCycleAmountPost?: number;
    frequency: string;
    startDate: string;
}

export const dummyIncome: Income[] = [{
    id: 0,
    name: "Wal-Mart",
    payCycleAmountPre: 1532.38,
    payCycleAmountPost: 1282.12,
    frequency: "Bi-Weekly",
    startDate: "4/24/2025"
}]