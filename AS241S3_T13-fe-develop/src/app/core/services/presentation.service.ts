import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presentation } from '../interfaces/presentation.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private apiUrl = `${environment.urlBackEnd}/api/presentations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Presentation[]> {
    return this.http.get<Presentation[]>(`${this.apiUrl}/all`);
  }

  getActive(): Observable<Presentation[]> {
    return this.http.get<Presentation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Presentation> {
    return this.http.get<Presentation>(`${this.apiUrl}/${id}`);
  }

  getByProduct(idProduct: number): Observable<Presentation[]> {
    return this.http.get<Presentation[]>(`${this.apiUrl}/product/${idProduct}`);
  }

  create(data: Presentation): Observable<Presentation> {
    return this.http.post<Presentation>(this.apiUrl, data);
  }

  update(id: number, data: Presentation): Observable<Presentation> {
    return this.http.put<Presentation>(`${this.apiUrl}/${id}`, data);
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
