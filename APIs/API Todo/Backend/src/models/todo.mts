// This class represents a Todo item with an id, text, and a done status.
export class Todo {
    done: boolean;
  
    constructor(public id: number, public text: string) {
      this.done = false;
    }
  }
  