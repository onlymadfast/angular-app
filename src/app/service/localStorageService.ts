import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, map, Observable} from "rxjs";
import {LoginObject} from "../entity/loginObject";
import * as CryptoJS from "crypto-js";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class LocalStorageService {

  private apiServerUrl = environment.apiBaseUrl;
  private encryptedKey = environment.encryptionKey;
  private token: string = '';
  private authorities?: string[];

  constructor(private http: HttpClient) {
  }

  public async signIn(loginObject: LoginObject) {
    const result = this.fetchToken(loginObject)

    await firstValueFrom(result)
      .then(response => {
        this.token = response.message
        this.authorities = response.authorities
      })
      .catch(error => {
        console.log(error)
      })

    await this.saveUserAndAuthoritiesAndTokenInLocalStorage(loginObject.username, this.token, this.authorities);
  }

  public saveUserAndAuthoritiesAndTokenInLocalStorage(user: string, token: string, authorities?: string[]) {
    localStorage.setItem("token", token);
    localStorage.setItem("name", user);
    if (authorities != null) {
      localStorage.setItem("authorities", authorities.toString())
    } else {
      console.log("authorities null and we dont save it in localStorage")
    }
  }

  public async getUserAndRolesIfExist(): Promise<{ roles: string | null; name: string | null }> {
    let username = localStorage.getItem("name");
    let authorities = localStorage.getItem("authorities")
    return { name: username, roles: authorities };
  }

  public getData(key: string): string {
    let data = localStorage.getItem(key) || "";

    if (key != "token") {
      return data;
    }
    return data;
  }


  public clearStorage() {
    return this.clearData();
  }

  public async clearData() {
    localStorage.clear();
  }

  public encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.encryptedKey).toString();
  }

  public decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.encryptedKey).toString(CryptoJS.enc.Utf8);
  }

  private fetchToken(loginObject: LoginObject): Observable<ResponseAuthToken> {
    return this.http.post<ResponseAuthToken>(`${this.apiServerUrl}/security/auth/authenticate`, loginObject)
      .pipe(
        map(data => {
          return data;
        })
      )
  }

}

//response from authenticate url
export class ResponseAuthToken {

  constructor(localDateTime: string, status: string,
              httpStatus: string, message: string,
              records?: Map<string, string>,
              authorities?: string[]) {
    this.localDateTime = localDateTime;
    this.status = status;
    this.httpStatus = httpStatus;
    this.message = message;
    this.records = records;
    this.authorities = authorities;
  }

  localDateTime: string;
  status: string;
  httpStatus: string;
  message: string;
  records?: Map<string, string>;
  authorities?: string[]

}
