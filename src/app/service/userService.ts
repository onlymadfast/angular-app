import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entity/user";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users/all`)
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/users/${id}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/users`, user);
  }

  public updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/users/${id}`, user);
  }

  public updateUserPassword(id: string, listOfPass: string[]): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/users/${id}/change`, listOfPass);
  }

  public deleteUserById(id: string) {
    return this.http.delete<User>(`${this.apiServerUrl}/users/${id}`);
  }

}
