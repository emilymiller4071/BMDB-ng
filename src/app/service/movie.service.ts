import { Movie } from "src/model/movie.class";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class MovieService {
    url: string = "http://localhost:8080/movies";

    constructor(private http: HttpClient) { }

    // getAll() => list
    getAll(): Observable<Movie[]> {
        return this.http.get(this.url) as Observable<Movie[]>;
    }

    getById(id: number): Observable<Movie> {
        return this.http.get(this.url + "/" + id) as Observable<Movie>;
    }


    getByTitle(title: string): Observable<Movie[]> {
        const url = `${this.url}/titles/`;
        const params = new HttpParams().set('title', title); // Add the title as a query parameter
    
        return this.http.get<Movie[]>(url, { params });
      }

    getByDirector(director: string): Observable<Movie[]> {
        const url = `${this.url}/director/`;
        const params = new HttpParams().set('director', director); // Add the director as a query parameter

        return this.http.get<Movie[]>(url, { params });
    }  

    getByYear(year: number): Observable<Movie[]> {
        const url = `${this.url}/year/`;
        const params = new HttpParams().set('year', year);

        return this.http.get<Movie[]>(url, { params });
    }

    create(movie: Movie): Observable<Movie> {
        return this.http.post(this.url, movie) as Observable<Movie>;
    }
   
    update(movie: Movie) {
        return this.http.put(this.url, movie) as Observable<Movie>;
    }

   delete(id: number): Observable<Movie> {
        return this.http.delete(this.url + "/" + id) as Observable<Movie>;
   }

 
}