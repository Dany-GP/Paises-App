import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _paises: Country[] = [];

  get paises(){
    return [...this._paises];
  }

  get Params (){
    return new HttpParams().set('fields','name,cca2,capital,flags,population');
  }

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'https://restcountries.com/v3.1';

  buscarPais(termino: string): Observable<Country[]> {

    const url: string = `${this.apiUrl}/name/${termino}`;

    return this.http.get<Country[]>(url, {params: this.Params});
  }

  buscarCapital(termino: string): Observable<Country[]> {

    const url: string = `${this.apiUrl}/capital/${termino}`;

    return this.http.get<Country[]>(url, {params: this.Params});
  }

  buscarCodigo(termino: string): Observable<Country[]> {

    const url: string = `${this.apiUrl}/alpha/${termino}`;

    return this.http.get<Country[]>(url);
  }

  buscarRegion(termino: string): Observable<Country[]> {

    const url: string = `${this.apiUrl}/region/${termino}`;

    return this.http.get<Country[]>(url, { params: this.Params });
  }


}
