import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string ='';

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  termino: string = '';

  debouncer: Subject<string> = new Subject();

  buscar() {
    this.onEnter.emit(this.termino);

  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  constructor() { }

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(valor => {
        this.onDebounce.emit(valor);
        
        //console.log(valor)
      })
  }
}
