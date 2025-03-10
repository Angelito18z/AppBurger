import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PedidoService } from '../Services/pedido.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  saborSeleccionado: string = '';
  cantidadSeleccionada: number = 0; // Por defecto, al menos una hamburguesa
  extrasSeleccionados: any[] = []; 
  metodoPagoSeleccionado: string = '';
  total: number = 0;

  pedidos: any[] = [];

  constructor(private toastController: ToastController,private pedidoService: PedidoService) {}

  recibirSabor(valor: string) {
    this.saborSeleccionado = valor;
    console.log(this.saborSeleccionado);
  }

  recibirExtras(extras: any[]) {
    this.extrasSeleccionados = extras;
    console.log(this.extrasSeleccionados);
  }

  recibirCantidad(cantidad: number) {
    this.cantidadSeleccionada = cantidad;
    console.log(this.cantidadSeleccionada);
  }

  recibirMetodoPago(valor: string) {
    this.metodoPagoSeleccionado = valor;
    console.log(this.metodoPagoSeleccionado);
  }

  validarFormulario(): boolean {
    if (!this.saborSeleccionado) {
      console.log("⚠️ Debes seleccionar un tipo de hamburguesa.");
      this.mostrarToast("⚠️ Debes seleccionar un tipo de hamburguesa", "warning");
      return false;
    }
    if (this.cantidadSeleccionada <= 0) {
      console.log("⚠️ La cantidad debe ser al menos 1.");
      this.mostrarToast("⚠️ La cantidad debe ser al menos 1", "warning");
      return false;
    }
    if (!this.metodoPagoSeleccionado) {
      console.log("⚠️ Debes seleccionar un método de pago.");
      this.mostrarToast("⚠️ Debes seleccionar un método de pago", "warning");
      return false;
    }
    return true; // Si todo está correcto
  }


  calcular() {

    if (!this.validarFormulario()) {
      console.log("❌ No se puede calcular, faltan datos.");
          return;
    }
    let precioBase = 0;

    // **Definir precios base según el sabor seleccionado**
    switch (this.saborSeleccionado) {
      case 'sencilla': precioBase = 30; break;
      case 'doble': precioBase = 40; break;
      case 'triple': precioBase = 60; break;
      case 'especial': precioBase = 75; break;
      default: 
        console.log("Error: Sabor no válido");
        return; // Salir de la función si no hay sabor seleccionado
    }

    // **Calcular el costo de los extras seleccionados**
    let costoExtras = this.extrasSeleccionados.reduce((total, extra) => total + extra.precio, 0);

    // **Calcular total multiplicando por la cantidad**
    let subtotal = (precioBase * this.cantidadSeleccionada)+costoExtras;

    // **Aplicar ajuste según el método de pago**
    if (this.metodoPagoSeleccionado === 'tarjeta') {
      subtotal *= 1.05; // 5% extra por pago con tarjeta
    }

    this.total = subtotal;
 // Crear el objeto pedido
 const nuevoPedido = {
  sabor: this.saborSeleccionado,
  cantidad: this.cantidadSeleccionada,
  extras: this.extrasSeleccionados,
  metodoPago: this.metodoPagoSeleccionado,
  total: this.total,
};

// Llamar al servicio para agregar el pedido
this.pedidoService.agregarPedido(nuevoPedido);

    this.mostrarToast("✅ Pedido Hecho", "success");
    console.log("Precio base:", precioBase);
    console.log("Costo extras:", costoExtras);
    console.log("Cantidad:", this.cantidadSeleccionada);
    console.log("Total a pagar:", this.total);
    this.mostrarPedidos();
  
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje, // Mensaje personalizado
      duration: 3000, // Duración en milisegundos (2 segundos)
      position: 'bottom', // Ubicación (top, middle, bottom)
      color: color, // Color del toast (success, warning, danger, primary, etc.)
    });

    await toast.present(); // Muestra el toast
  }

  mostrarPedidos() {
     this.pedidos = this.pedidoService.obtenerPedidos();
    console.log('Pedidos:', this.pedidos);
  }

}
