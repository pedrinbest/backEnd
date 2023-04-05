import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Pedro Lucas
// Douglas Marinho
@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private _http: HttpClient) {}

  add(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/produto', data);
  }

  update(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/produto/${id}`, data);
  }

  getList(): Observable<any> {
    return this._http.get('http://localhost:8080/produto');
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/produto/${id}`);
  }
}
