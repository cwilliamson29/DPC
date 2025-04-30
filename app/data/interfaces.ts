export interface Income {
    id?: number;
    name: string;
    payCycleAmountPre?: number;
    payCycleAmountPost?: number;
    frequency: string;
    startDate: string;
}