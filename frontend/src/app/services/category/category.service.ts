import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  // Load all categories
  public getAllCategories() {
    return this._http.get(`${baseUrl}/category/categories`);
  }

  // add new Category
  public addCategory(category) {
    return this._http.post(`${baseUrl}/category/add`, category);
  }
}
