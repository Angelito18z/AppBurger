import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-burger-complements',
  templateUrl: './burger-complements.component.html',
  styleUrls: ['./burger-complements.component.scss'],
  standalone:false
})
export class BurgerComplementsComponent  implements OnInit {
  
  @Output() extrasSeleccionados: EventEmitter<any[]> = new EventEmitter<any[]>(); // Emitimos un array de extras seleccionados
  extras: any[] = []; // Almacena los extras seleccionados
  
  
  constructor() { }

  ngOnInit() {}

  // Llamado cuando el checkbox cambia (marcado/desmarcado)
  seleccionarExtras(event: any, nombre: string, precio: number) {
    if (event.detail.checked) {
      // Si se marca el checkbox, agregamos el extra a la lista
      this.extras.push({ nombre, precio });
    } else {
      // Si se desmarca el checkbox, lo eliminamos de la lista
      this.extras = this.extras.filter(extra => extra.nombre !== nombre);
    }
    this.emitirExtras(); // Emitimos la lista de extras seleccionados
  }

  // Emitir la lista de extras seleccionados al componente padre
  emitirExtras() {
    this.extrasSeleccionados.emit(this.extras); // Emitimos la lista de extras
  }

}
