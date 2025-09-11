// Model class for Feeding information
export class Feeding {
    id: number;
    isFed: boolean;
    lastFed: string;

    // Constructor to initialize a Feeding object
    constructor(isFed: boolean) {
        this.id = Date.now();
        this.isFed = isFed;
        this.lastFed = "";
    }
}