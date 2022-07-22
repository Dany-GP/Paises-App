import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  buscar(termino: string) {

    this.termino = termino;

    this.paisService.buscarCapital(this.termino)
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
    this.paisService.buscarCapital(evt).subscribe(
      {
        next:
          (paises) => {
            this.hayError = false;

            this.paisesSugeridos = paises.splice(0, 5);
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
