import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supply } from '../interfaces/supply.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  private apiUrl = `${environment.urlBackEnd}/api/supplies`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Supply[]> {
    return this.http.get<Supply[]>(`${this.apiUrl}/all`);
  }

  getActive(): Observable<Supply[]> {
    return this.http.get<Supply[]>(this.apiUrl);
  }

  getById(id: number): Observable<Supply> {
    return this.http.get<Supply>(`${this.apiUrl}/${id}`);
  }

  create(data: Supply): Observable<Supply> {
    return this.http.post<Supply>(this.apiUrl, data);
  }

  update(id: number, data: Supply): Observable<Supply> {
    return this.http.put<Supply>(`${this.apiUrl}/${id}`, data);
  }

  disable(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/disable/${id}`, {});
  }

  restore(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/restore/${id}`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
