import { Injectable } from '@angular/core';

interface Pedido {
  sabor: string;
  cantidad: number;
  extras: any[];
  metodoPago: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  // Lista para almacenar los pedidos
  private pedidos: Pedido[] = [];

  // Método para agregar un nuevo pedido
  agregarPedido(pedido: Pedido): void {
    this.pedidos.push(pedido);
  }

  // Método para obtener todos los pedidos
  obtenerPedidos(): Pedido[] {
    return this.pedidos;
  }
}
