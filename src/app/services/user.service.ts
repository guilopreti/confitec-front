import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../users/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private server_url = 'http://localhost:5018/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.server_url}/users`);
  }

  updateUser(user: Usuario) {
    return this.http.put(`${this.server_url}/users/${user.id}`, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.server_url}/users/${userId}`);
  }

  createUser(user: any) {
    console.log(user);
    return this.http.post(`${this.server_url}/users`, user);
  }
}
