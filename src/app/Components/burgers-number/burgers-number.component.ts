import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-burgers-number',
  templateUrl: './burgers-number.component.html',
  styleUrls: ['./burgers-number.component.scss'],
  standalone: false
})
export class BurgersNumberComponent implements OnInit {

  @Output() cantidadSeleccionada: EventEmitter<number> = new EventEmitter<number>();
  cantidad: number = 0; // Valor inicial

  constructor() { }

  ngOnInit() {}

  validarCantidad(event: any) {
    let valor = event.target.value;

    // Elimina caracteres no numéricos
    valor = valor.replace(/\D/g, '');

    // Convierte a número y restringe a 2 dígitos
    let numero = parseInt(valor, 10) ;
    if (numero > 99) numero = 99;

    // Asigna el valor corregido y emite el evento
    this.cantidad = numero;
    this.emitirValor();
    
  }

  emitirValor() {
    this.cantidadSeleccionada.emit(this.cantidad);
  }

  
}
