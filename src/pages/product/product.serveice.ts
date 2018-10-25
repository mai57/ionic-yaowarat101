import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './products';
import { Headers } from '@angular/http';
import { LinkApi } from '../../app/app.link-api';

@Injectable()
export class ProductService {
  private productsUrl = LinkApi.link + 'products'; // URL to web api

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getProduct(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.p_Id === id))
    );
  }

  save(product: Product): Observable<any> {
    console.log(product)
    // if (product.p_Id) {
    //   console.log("already have this product");
    //   return this.http.put<Product>(this.productsUrl, product);
    // }
    return this.http.post<Product>(this.productsUrl, product);
  }

  deleteProduct(product: Product) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    const url = `${this.productsUrl}delete/${product.p_Id}`

    return this.http.post<Product>(url, options);
  }

  // Add new Product
  private post(product: Product) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Product>(this.productsUrl, product)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return Observable.throw(res.error || 'Server error');
  }
}
