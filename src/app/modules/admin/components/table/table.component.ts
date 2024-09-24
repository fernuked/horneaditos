import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  coleccionProductos: Producto[] = [];

  productoSeleccionado!: Producto; 
  modalVisibleProducto: boolean = false;

  nombreImagen!: string;
  imagen!: string;


  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripccion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService) {
  }

  ngOnInit(): void {
    this.servicioCrud.obetenerProductos().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }
  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripccion: this.producto.value.descripccion!,
        categoria: this.producto.value.categoria!,
        imagen: '',
        alt: ''
      }
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              this.servicioCrud.crearProducto(nuevoProducto, url)

                .then(producto => {
                  alert("Ha agregado un nuevo producto con exito")
                  this.producto.reset()
                })
                .catch(error => {
                  alert("Ha ocurrido un error al cargar el prodcuto. ");
                });
            });

        })
    }
  }

  cargarImagen(evento: any) {
    let archivo = evento.target.files[0];
    let reader = new FileReader();

    if (archivo != undefined) {
      reader.readAsDataURL(archivo);
      reader.onloadend = () => {
        let url = reader.result

        if (url != null) {
          this.nombreImagen = archivo.name;
          this.imagen = url.toString();
        }
      }
    }
  }

  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;

    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen).then(respuesta => {
      alert("se ha podido eliminar con exito")
    })
      .catch(error => {
        alert("ha ocurrido un error al eliminar prodcuto:\n" + error)
      });
  }

  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripccion: productoSeleccionado.descripccion,
      categoria: productoSeleccionado.categoria,
      // imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
  }

  editarProducto() {
    let datos: Producto = {
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripccion: this.producto.value.descripccion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!,
    }

    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              datos.imagen = url;


              this.actualizarProducto(datos);

              this.producto.reset();
            })
            .catch(error => {
              alert("Ocurrio un error");

              this.producto.reset();
            })
        })

    } else {
      this.actualizarProducto(datos);

    }


  }

  actualizarProducto(datos: Producto) {
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert("el producto ha sido modificado con exito!")
      })
      .catch(error => {
        alert("hubo un problema:(")
      }
      )
  }
}