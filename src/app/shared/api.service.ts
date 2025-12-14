import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { ResTodo, Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  async getTask(): Promise<Observable<ResTodo>>{
    return await this.http.get<ResTodo>(this.apiUrl)
  }

  postdata(data: any): Observable<Todo>{
    return this.http.post<Todo>(this.apiUrl, data)
  }

  deleteTask(id: string){
    return this.http.delete<Todo>("http://localhost:3000/posts/"+id)
  }

  toggle(id: any, Taskbody: any){
    return this.http.put<Todo>(this.apiUrl+"/"+ id, Taskbody)
  }
}
