export class Movie {
    id?: number;
    title: string;
    year?: number;
    rating: string;
    director: string;
    imageUrl?: string;

    constructor(id?: number, title: string = "", year?: number, rating: string = "", imageUrl?: string,
    director: string = "") {
        this.id = id;
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.director = director;
        this.imageUrl = imageUrl;
    }

}