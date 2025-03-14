import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PedidoService } from '../../Services/pedido.service';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem } from 'ngx-paypal';

@Component({
  selector: 'app-paypal',
  templateUrl: 'paypal.component.html',
  styleUrls: ['paypal.component.scss'],
  standalone: false,
})
export class PaypalComponent {

  saborSeleccionado: string = '';
  cantidadSeleccionada: number = 0; // Por defecto, al menos una hamburguesa
  extrasSeleccionados: any[] = []; 
  metodoPagoSeleccionado: string = '';
  total: number = 0;

  pedidos: any[] = [];

  public payPalConfig?: IPayPalConfig;

  purchaseItems = [
    { name: 'Waterproof Mobile Phone', quantity: 22, price: 450 },
    { name: 'Smartphone Dual Camera', quantity: 3, price: 240 },
    { name: 'Black Colour Smartphone', quantity: 1, price: 950 }
  ]
  total2: string = ''; 

  constructor(private toastController: ToastController,private pedidoService: PedidoService) {}
 
  ngOnInit(): void {
      this.initConfig();
    }

  private initConfig(): void {

 this.total2 = this.purchaseItems.map(x => x.quantity * x.price).reduce((a, b) => a + b, 0).toString();
   
  const currency = 'USD';

    this.payPalConfig = {
      currency: currency,
      clientId: 'Ac6oBWW5fLn-QbsaT3mIhXFlkJEr-c6vghCETt8XCbg_SJwzmH8TgrITy3bT3sRV3lvbP5f8V1BTZ7TQ',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: this.total2,
              breakdown: {
                item_total: {
                  currency_code: currency,
                  value: this.total2
                }
              }
            },
            items: this.purchaseItems.map(x => <ITransactionItem>
              {
                name: x.name,
                quantity: x.quantity.toString(),
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: currency,
                  value: x.price.toString(),
                },
              })
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {
          // Mostrar Toast de éxito si la transacción se aprueba correctamente
          this.mostrarToast("✅ La transacción fue aprobada con éxito!", "success");
          console.log('Transacción aprobada:', details);
        });
      },
      onClientAuthorization: (data) => {
        // Mostrar Toast de éxito si la autorización del cliente es exitosa
        this.mostrarToast("✅ Autorización del cliente completada con éxito!", "success");
        console.log('Autorización completada:', data);
      },
      onCancel: (data, actions) => {
        // Mostrar Toast de cancelación si el usuario cancela la transacción
        this.mostrarToast("⚠️ La transacción fue cancelada.", "warning");
        console.log('Transacción cancelada:', data, actions);
      },
      onError: (err) => {
        // Mostrar Toast de error si ocurre un error
        this.mostrarToast("❌ Ocurrió un error al procesar la transacción.", "danger");
        console.log('Error en la transacción:', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }  

//************************************************************************ */


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
this.total2 = this.total.toString()
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
  
  console.log(this.pedidos);
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
