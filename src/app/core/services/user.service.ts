import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { AddUserRequest } from '../model/add-user.model';
import { updateUserRequest } from '../model/update-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.apiBaseUrl}/api/ManageUser/getAllUser `
    );
  }

  getUserById(id: string): Observable<User[]> {
    return this.http.post<User[]>(
      `${environment.apiBaseUrl}/api/ManageUser/getAllUserById?samAccount=${id}`,
      id
    );
  }

  addUser(model: AddUserRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/ManageUser/insertUser`,
      model
    );
  }

  updateUser(updateCategoryRequest: updateUserRequest): Observable<User> {
    return this.http.post<User>(
      `${environment.apiBaseUrl}/api/ManageUser/updateUser`,
      updateCategoryRequest
    );
  }
}
