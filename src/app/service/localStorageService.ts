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

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public async signIn(loginObject: LoginObject): Promise<any> {
    console.log('token Object name ' + loginObject.username);
    //fetch token
    const result = this.fetchToken(loginObject)
    //take token
    await firstValueFrom(result)
      .then(response => {
        this.token = response
      })
      .catch(error => {
        console.log(error)
      })
    console.log("after firstValueFrom ->" + this.token + "<- here")
    await this.saveData(loginObject.username, this.token);

    console.log("after saving in sig up user in localStorage ->" + localStorage.getItem(loginObject.username))
  }

  public saveData(user: string, token: string) {
    console.log("Saving data")
    localStorage.setItem(user, this.encrypt(token));
    localStorage.setItem("name", user);
    console.log("saving username -> " + localStorage.getItem("name"))
  }

  public async getUserIfExist(): Promise<string> {
    let name = localStorage.getItem("name");
    if (name === '' || name === null) {
      console.log("tyt pusto")
      return "empty";
    } else {
      console.log("est` imya")
      return name;
    }
  }

  public getData(user: string) {
    let data = localStorage.getItem(user) || "";
    return this.decrypt(data);
  }


  public clearStorage() {
    return this.clearData()
      .then(() => this.router.navigate(['']))
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

  private fetchToken(loginObject: LoginObject): Observable<string> {
    console.log("Fetching!!")
    return this.http.post<ResponseAuthToken>(`${this.apiServerUrl}/security/auth/authenticate`, loginObject)
      .pipe(
        map(data => {
          return data.message;
        })
      )
  }

}

//response from authenticate url
export class ResponseAuthToken {

  constructor(localDateTime: string, status: string,
              httpStatus: string, message: string,
              records?: Map<string, string>) {
    this.localDateTime = localDateTime;
    this.status = status;
    this.httpStatus = httpStatus;
    this.message = message;
    this.records = records;
  }

  localDateTime: string;
  status: string;
  httpStatus: string;
  message: string;
  records?: Map<string, string>;

}
