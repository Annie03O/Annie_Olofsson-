// En class med id, uppgift och om den är klar eller inte
export class Todo {
    constructor(public id: number, public task: string, public completed: boolean) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
}