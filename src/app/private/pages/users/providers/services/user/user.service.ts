import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../../../shared/interfaces/user.interface';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.domain;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}users/${id}`);
  }

  addUser(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}users/`, data);
  }

  editUser(data: User, id: number): Observable<User> {
    return this.http.put<User>(`${this.url}users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}users/${id}`);
  }


}
