// cada reducer tiene su propio state

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
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from "../types";

const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoEditar: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {

        case AGREGAR_PRODUCTO:
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload // true
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                // crea una copia de los productos que están en el state y le añade el nuevo producto que esta en el payload del action
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload // true
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar: action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoEliminar),
                productoEliminar: null
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoEditar: action.payload
            }
        case PRODUCTO_EDITAR_EXITO:
            return {
                ...state,
                productoEditar: null,
                productos: state.productos.map((producto) => (producto.id === action.payload.id ? producto = action.payload : producto))
            }
        default:
            return state;
    }
}