import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/users';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.urlBackEnd}/v1/api/users`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  getByState(state: boolean): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/state/${state}`);
  }
  create(user: Partial<User>): Observable<User> {
  
    return this.http.post<User>(this.apiUrl, user);
  }
  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  restore(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/restore/${id}`, {});
  }

  /** ✅ Subida de foto de perfil */
  uploadProfilePhoto(id: number, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<User>(`${this.apiUrl}/${id}/upload-photo`, formData);
  }

  /** 📄 Descargar PDF de usuarios activos */
  downloadActiveUsersPdf() {
    return this.http.get(`${this.apiUrl}/pdfUserActive`, { responseType: 'blob' });
  }

  /** 📄 Descargar PDF de usuarios inactivos */
  downloadInactiveUsersPdf() {
    return this.http.get(`${this.apiUrl}/pdfUserInactive`, { responseType: 'blob' });
  }

}
