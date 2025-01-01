import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchDetailsService {
    
    constructor(private http: HttpClient) { }

    getSearchData(name, favoriteColor){
        return this.http.get(`http://localhost:5000/search?term=${name}&color=${favoriteColor}`)
    }

    getDetailsData(id){
        return this.http.get(`http://localhost:5000/details/${id}`)
    }
}