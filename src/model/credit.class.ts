import { Actor } from "./actor.class";
import { Movie } from "./movie.class";

export class Credit {
    id: number;
    movie: Movie;
    actor: Actor;
    role: string;

    constructor(id: number = 0, movie: Movie = new Movie, actor: Actor = new Actor,
        role: string = "") {
            this.id = id;
            this.movie = movie;
            this.actor = actor;
            this.role = role;
        }
}