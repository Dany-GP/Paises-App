import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html'
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva : string = '';

  paises: Country[] = [];
  hayError: boolean = false;

  activarRegion(region: string){

    if(this.regionActiva === region){
      return;
    }

    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarRegion(region)
    .subscribe(
      {
        next:
          (paises) => {
            this.hayError = false;
            
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

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
  }

}
