export class Feeding {
    id: number;
    isFed: boolean;
    lastFed: string;

    constructor(isFed: boolean) {
        this.id = Date.now();
        this.isFed = isFed;
        this.lastFed = "";
    }
}