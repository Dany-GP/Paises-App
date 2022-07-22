import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html'
})
export class PorPaisComponent {

  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  buscar(termino: string) {

    this.termino = termino;

    console.log(this.termino);

    this.paisService.buscarPais(this.termino)
      .subscribe(
        {
          next:
            (paises) => {
              this.hayError = false;
              this.mostrarSugerencias = false;
              this.paises = paises;
            },
          error:
            (error) => {
              this.hayError = true;
              this.paises = [];
            }
        }

      );

  }

  sugerir(evt: string) {
    this.termino = evt;
    this.mostrarSugerencias = true;
    if (evt.trim().length == 0) {
      this.paisesSugeridos = [];
      return;
    }
    this.paisesSugeridos = [];
    this.hayError = false;
    this.paisService.buscarPais(evt).subscribe(
      {
        next:
          (paises) => {
            this.hayError = false;

            this.paisesSugeridos = paises.splice(0, 3);
          },
        error:
          (error) => {
            //this.hayError = true;
            this.paisesSugeridos = [];
          }
      }
    );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);

  }

  constructor(private paisService: PaisService) {
    this.paises = paisService.paises;
  }



}
