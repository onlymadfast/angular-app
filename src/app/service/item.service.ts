import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';
import {Item} from '../entity/item';
import {environment} from 'src/environments/environment';
import {PageableOfItem} from "../entity/pageableOfItem";
import {LocalStorageService} from "./localStorageService";

@Injectable({providedIn: 'root'})
export class ItemService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService) {
  }

  //получение списка товаров
  public getItems(): Observable<PageableOfItem> {
    return this.http.get<PageableOfItem>(`${this.apiServerUrl}/items/list`);
  }

  //получение одного товара по имени
  public getItem(id: String): Observable<Item> {
    return this.http.get<Item>(`${this.apiServerUrl}/items/${id}`)
  }

  //получение товаров по категории
  public getItemByCategory(id: String, page?: number, size?: number): Observable<Item[]> {
    page = page == null ? 0 : page > 0 ? page - 1 : page;
    size = size == null ? 10 : size;
    return this.http.get<Item[]>(`${this.apiServerUrl}/items/item/category/${id}?page=${page}&size=${size}`)
  }

  //получение топ товаров
  public getTopItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiServerUrl}/top10`)
  }

  //добавление товара
  public createItem(item: Item): Observable<Item> {

    let user = this.localStorage.getUserIfExist();
    console.log('user -> ' + user);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + user
      })
    };
    return this.http.post<Item>(`${this.apiServerUrl}/items/edit`, item);
  }

  //обновление товара
  public updateItem(id: string, item?: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiServerUrl}/items/edit/${id}`, item);
  }

  //удаление товара
  public deleteItem(id: string): Observable<String> {
    return this.http.delete<String>(`${this.apiServerUrl}/items/edit/${id}`);
  }

  //TODO остановился на 1:28:17 https://www.youtube.com/watch?v=Gx4iBLKLVHk
  //так же смотерел 2:09:16 https://www.youtube.com/watch?v=8ZPsZBcue50&t=1518s
  //надо запустить и посмотреть как отрабатывает сервер сначала по товарам, разобраться с картинками, чтобы вытягивались.
  //дальше добиться простого вывода на фронте, тоже по товарам.


}
