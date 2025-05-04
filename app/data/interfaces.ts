export interface Income {
    id?: number;
    name: string;
    payCycleAmountPre?: number;
    payCycleAmountPost?: number;
    frequency: string;
    startDate: string;
}

export interface IncomeErrors {
    name: boolean,
    payCycleAmountPre: boolean,
    payCycleAmountPost: boolean,
    frequency: boolean,
    startDate: boolean,
}