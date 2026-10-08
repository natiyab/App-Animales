import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Animal {
  raza: string;
  imagen: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'https://dog.ceo/api';

  constructor(private http: HttpClient) {}

  obtenerRazas(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/breeds/list/all`
    );
  }

  obtenerImagen(raza: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/breed/${raza}/images/random`
    );
  }

}