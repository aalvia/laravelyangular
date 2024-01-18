import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/products'; // Cambia la URL según la configuración de tu API
  private productUpdatedSource = new Subject<void>();

  productUpdated$ = this.productUpdatedSource.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  getProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, product);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  
  notifyProductUpdated(): void {
    this.productUpdatedSource.next();
  }
}
