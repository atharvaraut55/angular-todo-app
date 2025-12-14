export interface Todo{
    id: string;
    task: string;
    completed: boolean;
}

export class ResTodo{
    id: number = 0;
    task: string = '';
    completed: boolean = false;
}