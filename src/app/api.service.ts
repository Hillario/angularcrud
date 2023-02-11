import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data:any)
  {
    return this.http.post<any>('https://my-json-server.typicode.com/hillario/angularcrud/productList/',data)
  }

  getProduct()
  {
    return this.http.get<any>('https://my-json-server.typicode.com/hillario/angularcrud/productList/')
  }

  putProduct(data:any,id:number)
  {
    return this.http.put<any>('https://my-json-server.typicode.com/hillario/angularcrud/productList/'+id,data)
  }

  deleteProduct(id:number)
  {
    return this.http.delete('https://my-json-server.typicode.com/hillario/angularcrud/productList/'+id)
  }
}
