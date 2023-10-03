import { Actor } from "src/model/actor.class";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ActorService {
    url: string = "http://localhost:8080/actors";

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<Actor[]> {
        return this.http.get(this.url) as Observable<Actor[]>;
    }

    getById(id: number): Observable<Actor> {
        return this.http.get(this.url + "/" + id) as Observable<Actor>;
    }

    getActorsByMovieTitle(title: string): Observable<Actor[]> {
        const url = `${this.url}/by-movie-title/`;
        const params = new HttpParams().set('title', title);

        return this.http.get<Actor[]>(url, { params });
    }

    create(actor: Actor): Observable<Actor> {
        return this.http.post(this.url, actor) as Observable<Actor>;
    }
   
    update(actor: Actor): Observable<Actor> {
        return this.http.put(this.url, actor) as Observable<Actor>;
    }

    delete(id: number) {
        return this.http.delete(this.url + "/" + id) as Observable<Actor>;
    }
}