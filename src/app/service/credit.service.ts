import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Credit } from "src/model/credit.class";

@Injectable({
    providedIn: "root"
})

export class CreditService {
    url: string = "http://localhost:8080/credits";

    constructor(private http: HttpClient) { }

    getAll(): Observable<Credit[]> {
        return this.http.get(this.url) as Observable<Credit[]>;
    }

    getById(id: number): Observable<Credit> {
        return this.http.get(this.url + "/" + id) as Observable<Credit>;
    }

    getByMovieId(id: number): Observable<Credit[]> {
        return this.http.get(this.url + "/movie/" + id) as Observable<Credit[]>
    }

    getByActorId(id: number): Observable<Credit[]> {
        return this.http.get(this.url + "/actor/" + id) as Observable<Credit[]>;
    }

    create(credit: Credit): Observable<Credit> {
        return this.http.post(this.url, credit) as Observable<Credit>;
    }

    update(credit: Credit): Observable<Credit> {
        return this.http.put(this.url, credit) as Observable<Credit>;
    }

    delete(id: number): Observable<Credit> {
        return this.http.delete(this.url + "/" + id) as Observable<Credit>;
    }
}