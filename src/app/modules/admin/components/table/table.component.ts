import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Librería para alertas personalizadas

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

// este componente permite gestionar productos en una aplicación mediante un formulario reactivo,
// proporcionando funcionalidades para agregar, editar y eliminar productos. La comunicación con la base de datos 
// se realiza a través del servicio CrudService.

export class TableComponent {

  // En el componente TableComponent, se gestiona la lista de productos a través de un formulario reactivo 
  // y métodos para agregar, editar y eliminar productos.

  // Lista de productos almacenada localmente como un array
  coleccionProductos: Producto[] = [];

  // La propiedad coleccionProductos almacena una lista de productos obtenida 
  //  desde el servicio CrudService en el método ngOnInit(), que se ejecuta al cargar la página.

  //  Este servicio proporciona los métodos necesarios para interactuar con la base de datos, como obtener, 
  //  crear, actualizar y eliminar productos. Además, el componente tiene una propiedad productoSeleccionado,
  //  que guarda el producto que está siendo editado o eliminado. La propiedad modalVisibleProducto controla
  //  la visibilidad del modal que se utiliza para confirmar la eliminación de un producto.

  // Variable para guardar el producto seleccionado (puede estar vacía al inicio)
  // Esta variable guarda el producto actualmente seleccionado (para editar o eliminar).
  // y se utiliza en las funciones relacionadas con modales (mostrarEditar, mostrarBorrar).

  productoSeleccionado!: Producto;

  // Indicador para mostrar u ocultar el modal de eliminación
  modalVisibleProducto: boolean = false;

  // Formulario reactivo para gestionar los datos del producto.
  // Define un formulario reactivo para gestionar los datos de un producto.
  // Cada campo(nombre, precio, etc.) está vinculado con un FormControl, que incluye
  // alidaciones(Validators.required asegura que el campo sea obligatorio).

  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    autor: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
    oferta: new FormControl('', Validators.required),
    stock: new FormControl(0, Validators.required)
  });

  // El formulario reactivo, producto, contiene varios campos(como nombre, precio, autor, etc.) 
  // vinculados con controles de formulario(FormControl) que incluyen validaciones para asegurar 
  // que cada campo sea obligatorio. Estos campos son utilizados en los métodos de agregar y editar productos.


  // Inyecta un servicio (CrudService) para realizar operaciones de CRUD 
  // (crear, leer, actualizar y eliminar) en la base de datos.

  constructor(public servicioCrud: CrudService) { }


  // Cuando se carga la página, obtiene la lista de productos desde el servicio y la guarda en la variable coleccionProductos.
  // ¿Para qué sirve?
  // Para que los productos que ya están guardados aparezcan en la tabla apenas se abre la página.

  ngOnInit(): void {

    // Suscripción para obtener la lista de productos desde el servicio
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    });
  }

  // Método para agregar un nuevo producto
  async agregarProducto() {
    if (this.producto.valid) {
      const nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        autor: this.producto.value.autor!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!,
        oferta: this.producto.value.oferta!,
        stock: this.producto.value.stock!
      };

      // El método agregarProducto() se encarga de crear un nuevo producto. Si el formulario es válido,
      //  los datos del formulario se envían al servicio CrudService para ser guardados en la base de datos. 
      //  Si la operación es exitosa, se muestra una notificación de éxito; si ocurre un error, el formulario 
      //  se restablece y se muestra un mensaje de error.


      await this.servicioCrud.crearProducto(nuevoProducto)
        .then(() => {
          Swal.fire("¡Producto agregado!", "El producto fue añadido exitosamente.", "success");
        })
        .catch(error => {
          Swal.fire("Error", `Hubo un problema al agregar el producto: ${error}`, "error");
          this.producto.reset();
        });
    }
  }

  // Mostrar el modal para confirmar eliminación
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;
    this.productoSeleccionado = productoSeleccionado;
  }

  // Método para eliminar un producto
  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto)
      .then(() => {
        Swal.fire("Producto eliminado", "El producto fue eliminado correctamente.", "success");
      })
      .catch(error => {
        Swal.fire("Error", `No se pudo eliminar el producto: ${error}`, "error");
      });
  }

  // Cuando un producto necesita ser eliminado, el método mostrarBorrar() muestra el modal de confirmación, 
  // y el método borrarProducto() ejecuta la eliminación llamando al servicio para borrar el producto de la 
  // base de datos. Si la eliminación es exitosa, se muestra una notificación de éxito.

  // Mostrar los datos del producto seleccionado en el modal para editar
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      autor: productoSeleccionado.autor,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt,
      oferta: productoSeleccionado.oferta,
      stock: productoSeleccionado.stock
    });
  }


  // // El método mostrarEditar() permite cargar los datos de un producto seleccionado en el formulario para su
  // //  edición, mientras que editarProducto() actualiza la información del producto en la base de datos con los nuevos 
  // valores del formulario. Si la actualización es exitosa, se muestra una notificación de éxito.

  // Método para actualizar la información de un producto
  editarProducto() {
    const datos: Producto = {
      idProducto: this.productoSeleccionado.idProducto, // No se modifica el ID
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      autor: this.producto.value.autor!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.producto.value.imagen!,
      alt: this.producto.value.alt!,
      oferta: this.producto.value.oferta!,
      stock: this.producto.value.stock!
    };

    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(() => {
        Swal.fire("Producto actualizado", "Los cambios se guardaron correctamente.", "success");
      })
      .catch(error => {
        Swal.fire("Error", `No se pudo actualizar el producto: ${error}`, "error");
      });
  }
}



