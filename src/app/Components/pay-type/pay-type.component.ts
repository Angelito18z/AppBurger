import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pay-type',
  templateUrl: './pay-type.component.html',
  styleUrls: ['./pay-type.component.scss'],
  standalone:false
})
export class PayTypeComponent  implements OnInit {

  @Output() metodoPagoSeleccionado: EventEmitter<string> = new EventEmitter<string>(); // Emitimos el valor seleccionado
  seleccionado: string = ''; // Almacena el valor seleccionado

  constructor() { }

  ngOnInit() {}


  // Llamado cuando el radio cambia (cuando se selecciona una opción)
  seleccionarMetodoPago(event: any) {
    this.seleccionado = event.detail.value; // Captura el valor seleccionado
    this.emitirMetodoPago(); // Emitimos el valor al componente padre
  }

  // Emitir el valor seleccionado
  emitirMetodoPago() {
    this.metodoPagoSeleccionado.emit(this.seleccionado); // Emitimos el valor seleccionado (ej. "tarjeta" o "efectivo")
  }


}
