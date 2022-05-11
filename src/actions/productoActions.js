import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from "../types";

// usar la API de jsonserver
import clienteAxios from '../config/axios'

// alertas 
import Swal from 'sweetalert2'

/****** Crear nuevos productos ******/
export function crearNuevoProductoAction(producto) {

    return async (dispatch) => {
        // el dispatch siempre es el que manda a ejecutar las acciones/funciones al reducer
        dispatch(agregarProducto());

        try {
            // insertar en la API/base de datos
            await clienteAxios.post('/productos', producto);

            // si todo sale bien, actualiza el state con el nuevo producto
            dispatch(agregarproductoExito(producto));

            // Alerta
            Swal.fire(
                'Agregado',
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {

            console.log(error);

            // pone el loading como false y el erro en true, por lo que muestra el mensaje establecido en el HTML
            dispatch(agregarproductoError(true));

            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al agregar el producto'
            })
        }

    }
}

// Pone el loading en true
const agregarProducto = () => ({
    // type: tipo de accion a ejecutar
    type: AGREGAR_PRODUCTO,
    // payload: modiifcador
    payload: true
})

// una vez agregado el producto a la API/base de datos, se añade este nuevo producto al state
const agregarproductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo un error al agrear el producto
const agregarproductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

/****** Descarga productos de la API ******/

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargaProductos());

        try {
            // obtiene los producto de la api/base de datos
            const respuesta = await clienteAxios.get('/productos');

            // manda a llamar a la funcion pasandole los datos obtenidos de la base de datos
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {

            console.log(error);

            dispatch(descargaProductosError());
        }
    }
}

// pone el loading 
const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

// manda los productos obtenidos de la api, para actualizar el state
const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

// establece el error como true, para que sea mostrado al usuario(HTML)
const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})


/****** selecciona y elimina el producto ******/
// Recibe el id del producto a eliminar
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoAEliminar(id));
        // console.log(id);
        try {

            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            // si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
            )

        } catch (error) {

            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

// pone el id en el state
const obtenerProductoAEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

// Una vez que se eliminó de la API/base de datos, actualiza el state sin ese id eliminado  
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

// establece el error como true, para que sea mostrado al usuario(HTML)
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})


/****** Colocar producto en edición ******/
export function editarProductoAction(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoAEditar(producto))
    }
}

// pone el producto a editar en el state, en productoEditar
const obtenerProductoAEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})


/****** Edita un registro en la API y en el state ******/
export function guardarEditarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(guardarEditarProducto());
        try {

            // actualiza el producto en la API/base de datos
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            // le pasa el producto editado
            dispatch(guardarEditarProductoExito(producto));

            // Alerta
            Swal.fire(
                'Actualizado',
                'El producto se actualizó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            dispatch(editarProductoError());
        }
    }
}

// pone el loading 
const guardarEditarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

// le manda el producto editado y lo actuliza en el state
const guardarEditarProductoExito = (producto) => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

// establece el error como true, para que sea mostrado al usuario(HTML)
const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: true
})