// Importación de los módulos necesarios de Angular.
import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // Declaración de las variables y propiedades del componente
  coleccionProductos: Producto[] = []; // Colección de productos a mostrar en la tabla
  productoSeleccionado!: Producto;
  modalVisibleProducto: boolean = false;

  // Definición del formulario con validaciones ejeje
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required), 
    precio: new FormControl(0, Validators.required), 
    descripcion: new FormControl('', Validators.required), 
    categoria: new FormControl('', Validators.required), 
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required) 
  });


  constructor(public servicioCrud: CrudService) { }


  ngOnInit(): void { }
  async agregarProducto() {
    if (this.producto.valid) {
      // Creación de un nuevo producto basado en los valores del formulario
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripccion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!
      };

      try {
        // Llamada al servicio para crear el producto
        await this.servicioCrud.crearProducto(nuevoProducto);
        alert("Ha agregado un nuevo producto con éxito."); // Notificación de éxito
      } catch (error) {
        alert("Ha ocurrido un error al cargar un producto."); // Notificación de error
      }
    }
  }

  // Método para mostrar el modal de confirmación pcuando se elimina un producto.
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true; 
    this.productoSeleccionado = productoSeleccionado; 
  }

  // Método para eliminar un producto seleccionado
  async borrarProducto() {
    try {
      // Llamamos al servicio para eliminar el producto
      await this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto);
      alert("Se ha podido eliminar con éxito."); // Notificación de éxito
    } catch (error) {
      alert("Ha ocurrido un error al eliminar el producto: " + error); // Notificación de error
    }
  }

  // Método para mostrar el modal cuando se edita un producto.
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado; 
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripccion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    });
  }

  // Método para editar un producto
  async editarProducto() {
    let datos: Producto = {
      idProducto: this.productoSeleccionado.idProducto, 
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!, 
      descripccion: this.producto.value.descripcion!, 
      categoria: this.producto.value.categoria!,
      imagen: this.producto.value.imagen!, 
      alt: this.producto.value.alt!
    };

    try {
      // Llamada al servicio para modificar el producto
      await this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos);
      alert("El producto se ha modificado con éxito."); // Notificación de éxito
    } catch (error) {
      alert("Huboo un problema al modificar el producto: " + error); // Notificación de error
    }
  }

  // Método para cargar una imagen seleccionada
  // cargarImagen(event: any) {
  //   const file = event.target.files[0]; // Obtener el archivo seleccionado
  //   if (file) {
  //     console.log(file); // Mostrar información del archivo en la consola (para depuración)
  //   }
  // }
}
