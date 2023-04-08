import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendDataService {
  constructor(private http: HttpClient) {}

  public get() {
    const url: string = '/assets/data.json';
    return this.http.get(url);
  }
}
