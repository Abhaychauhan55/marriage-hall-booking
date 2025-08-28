import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hall } from '../models/hall';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HallService {
   //private apiUrl = `${environment.apiBaseUrl}/api/halls`;
   private apiUrl = 'http://localhost:8080/api/halls';

  constructor(private http: HttpClient) { }

  getAllHalls(): Observable<Hall[]> {
    return this.http.get<Hall[]>(this.apiUrl);
  }

  getHallById(id: number): Observable<Hall> {
    return this.http.get<Hall>(`${this.apiUrl}/${id}`);
  }

  createHall(hall: Hall): Observable<Hall> {
    return this.http.post<Hall>(this.apiUrl, hall);
  }

  updateHall(id: number, hall: Hall): Observable<Hall> {
    return this.http.put<Hall>(`${this.apiUrl}/${id}`, hall);
  }

  deleteHall(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
