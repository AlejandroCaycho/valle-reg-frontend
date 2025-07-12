import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DniResponse } from '../interfaces/dni-response'; 
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class DniService {

  private apiUrl = `${environment.urlBackEnd}/api/dni`;

  constructor(private http: HttpClient) { }

  buscarPorDni(dni: string): Observable<DniResponse> {
    return this.http.get<DniResponse>(`${this.apiUrl}/${dni}`);
  }
}
