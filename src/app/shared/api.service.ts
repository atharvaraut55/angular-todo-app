import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResTodo, Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '/api/posts';

  constructor(private http: HttpClient) { }

  getTask(): Observable<ResTodo> {
    return this.http.get<ResTodo>(this.apiUrl);
  }

  postdata(data: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, data);
  }

  deleteTask(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`);
  }

  toggle(id: string, taskBody: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, taskBody);
  }
}