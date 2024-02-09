import { Injectable, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltradoService{

  private listaEspecializaciones!: Array<any>

  $listaEspecializaciones: BehaviorSubject<any> = new BehaviorSubject<any>(this.listaEspecializaciones);

  constructor(private backendService: BackendService) { 

    this.listaEspecializaciones = [];
    this.$listaEspecializaciones.next(this.listaEspecializaciones);
    
  }

  filtrarEspecializaciones(filtro:string){
    if (filtro !== '') {
      const especializacionesFiltradas = this.listaEspecializaciones.filter(especializacion =>
          especializacion.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
      this.$listaEspecializaciones.next(especializacionesFiltradas);
  } else {
      this.$listaEspecializaciones.next(this.listaEspecializaciones);
  }
  }

  getLista(token: string): Observable<any> {
    return this.backendService.getEspecializacion(token).pipe(
      tap(lista => {
        this.listaEspecializaciones = lista;
        this.$listaEspecializaciones.next(this.listaEspecializaciones);
      })
    );
  }

}
