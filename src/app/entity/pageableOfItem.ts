import {Item} from "./item";

export class PageableOfItem {

  constructor(content: Item[], pageable: { sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number; pageNumber: number; pageSize: number; paged: boolean; unpaged: boolean },
              last: boolean, totalElements: number, totalPages: number, number: number, size: number,
              sort: { empty: boolean; sorted: boolean; unsorted: boolean }, first: boolean,
              numberOfElements: number, empty: boolean) {
    this.content = content;
    this.pageable = pageable;
    this.last = last;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.number = number;
    this.size = size;
    this.sort = sort;
    this.first = first;
    this.numberOfElements = numberOfElements;
    this.empty = empty;
  }

  content: Item[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    }
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  }
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  first: boolean;
  numberOfElements: number;
  empty: boolean;



}
