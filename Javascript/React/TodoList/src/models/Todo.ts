// Model class for a Todo item
export class Todo {
    constructor(public id: number, public task: string, public completed: boolean) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
}