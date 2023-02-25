import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map, Observable} from 'rxjs';
import {Item} from '../entity/item';
import {environment} from 'src/environments/environment';
import {PageableOfItem} from "../entity/pageableOfItem";
import {LocalStorageService} from "./localStorageService";
import {ItemForCreate} from "../update-item/update-item.component";

@Injectable({providedIn: 'root'})
export class ItemService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  /**
   * Get items with pagination
   */
  public getItems(): Observable<PageableOfItem> {

    const token = this.localStorageService.getData("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get<PageableOfItem>(`${this.apiServerUrl}/items/view/list`, httpOptions);
  }

  /**
   * Get item by id
   * @param id - item identifier
   */
  public getItem(id: String): Observable<Item> {

    const token = this.localStorageService.getData("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get<Item>(`${this.apiServerUrl}/items/view/${id}`, httpOptions)
  }

  //получение товаров по категории
  public getItemByCategory(id: String, page?: number, size?: number): Observable<Item[]> {
    page = page == null ? 0 : page > 0 ? page - 1 : page;
    size = size == null ? 10 : size;
    return this.http.get<Item[]>(`${this.apiServerUrl}/items/view/item/category/${id}?page=${page}&size=${size}`)
  }

  //получение топ товаров
  public getTopItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiServerUrl}/top10`)
  }

  /**
   * Create item
   * @param item - item object to create
   */
  public createItem(item: ItemForCreate): Observable<string> {

    const token = this.localStorageService.getData("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.post<Item>(`${this.apiServerUrl}/items/edit`, item, httpOptions)
      .pipe(
        map(data => {
          return data.id;
        })
      )
  }

  /**
   * Updating item
   * @param id - item identifier
   * @param item - item object
   */
  public updateItem(id: string, item?: Item): Observable<Item> {

    const token = this.localStorageService.getData("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.put<Item>(`${this.apiServerUrl}/items/edit/${id}`, item, httpOptions)
      .pipe(
        map(data => {
          return data;
        })
      )
  }

  /**
   * Delete item by id
   * @param id - item identifier
   */
  public deleteItem(id: string): Observable<String> {

    const token = this.localStorageService.getData("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.delete<String>(`${this.apiServerUrl}/items/edit/${id}`, httpOptions);
  }

}
