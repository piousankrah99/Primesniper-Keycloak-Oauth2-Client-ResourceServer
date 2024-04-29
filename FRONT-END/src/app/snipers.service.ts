import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Snipers } from './Snipers';
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SniperService {

  private baseURL = "http://localhost:8081`/Snipers";

  constructor(private httpClient: HttpClient) { }

  getSnipersList(): Observable<Snipers[]> {
    return this.httpClient.get<Snipers[]>(`${this.baseURL}/primeSnipers`);
  }

  addNewSniper(newSniper: FormGroup): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/addNewSniper`, newSniper);
  }

  updateSniper(updatedSniper: FormGroup, id: number): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, updatedSniper);
  }


  deleteSniper(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  getSniperById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-HTTP-Method-Override': 'GET'
    });

    return this.httpClient.get(`${this.baseURL}/${id}`, { headers });
  }
}
