import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private url(request: Partial<RequestParameters>): string {
    return `${request.baseUrl ? request.baseUrl : this.baseUrl}/${request.controller}${request.action ? `/${request.action}` : ""}`;
  }

  get<T>(request: Partial<RequestParameters>, id?: string): Observable<T> {
    let url = "";
    if (request.fullEndPoint) {
      url = request.fullEndPoint;
    } else {
      url = `${this.url(request)}${id ? `/${id}` : ""}${request.queryString ? `?${request.queryString}` : ""}`;
    }
    const headers = request.headers || this.getAuthHeaders();
    return this.httpClient.get<T>(url, { headers, responseType: request.responseType as "json" });
  }

  post<T>(request: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url = "";
    if (request.fullEndPoint) {
      url = request.fullEndPoint;
    } else {
      url = `${this.url(request)}${request.queryString ? `?${request.queryString}` : ""}`;
    }
    const headers = request.headers || this.getAuthHeaders();
    return this.httpClient.post<T>(url, body, { headers, responseType: request.responseType as "json" });
  }

  delete<T>(request: Partial<RequestParameters>, id: string): Observable<T> {
    let url = "";
    if (request.fullEndPoint) {
      url = request.fullEndPoint;
    } else {
      url = `${this.url(request)}/${id}${request.queryString ? `?${request.queryString}` : ""}`;
    }
    const headers = request.headers || this.getAuthHeaders();
    return this.httpClient.delete<T>(url, { headers, responseType: request.responseType as "json" });
  }

  put<T>(request: Partial<RequestParameters>, body?: Partial<T>): Observable<T> {
    let url = "";
    if (request.fullEndPoint) {
      url = request.fullEndPoint;
    } else {
      url = `${this.url(request)}${request.queryString ? `?${request.queryString}` : ""}`;
    }
    const headers = request.headers || this.getAuthHeaders();
    return this.httpClient.put<T>(url, body, { headers, responseType: request.responseType as "json" });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;
  headers: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  responseType?: string = 'json';
}
