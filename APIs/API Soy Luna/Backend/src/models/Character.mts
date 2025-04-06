// This file defines the Character class, which represents a character in a movie or show.
export class Character {
    constructor(public id: number, public name: string, public actor: string, public imgUrl: string, public link: string) {
        this.id = id;
        this.name = name;
        this.actor = actor;
        this.imgUrl = imgUrl;
        this.link = link;
    }
}