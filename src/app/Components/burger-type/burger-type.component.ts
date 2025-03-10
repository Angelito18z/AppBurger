import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-burger-type',
  templateUrl: './burger-type.component.html',
  styleUrls: ['./burger-type.component.scss'],
  standalone:false
})
export class BurgerTypeComponent  implements OnInit {

  @Output() saborSeleccionado: EventEmitter<string> =new EventEmitter<string>();

seleccion: string = '';
  
constructor() { }
  ngOnInit() {}

  // Método que se llama cuando el usuario selecciona un sabor
  seleccionarSabor(event: any) {
    this.seleccion = event.detail.value; // Se obtiene el valor seleccionado del evento
    this.emitirValor(); // Emitir el valor al componente padre
  }

  // Método que emite el valor seleccionado
  emitirValor() {
    this.saborSeleccionado.emit(this.seleccion); // Emitimos solo el valor (no un objeto)
  }
}
