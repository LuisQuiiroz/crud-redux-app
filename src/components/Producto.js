import React from 'react'
// Redux
import { useDispatch } from 'react-redux';
// Navegación
import { useNavigate } from 'react-router-dom'
// Redux Actions
import { borrarProductoAction, editarProductoAction } from '../actions/productoActions';
// Alerta
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Confirmar si desea eliminarlo
    // Si el usuario confirma se manda a llamar el action para borrarlo
    const confirmarEliminarProducto = ( id ) => {
        // preguntar al usuario
        // Si el usuario cancela, no pasa nada
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                dispatch( borrarProductoAction( id ) );
                
            }
          })
        
    }

    // Función que redirige de forma programada
    const redireccionarEdicion = ( producto ) => {
        // manda a llamar el action
        dispatch( editarProductoAction( producto) )
        // manda al usuairo a esa ruta, que es donde esta el formulario de edición
        navigate(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td> { nombre } </td>
            <td> <span className='font-weight-bold'> $ { precio } </span> </td>
            <td className='acciones'>
                <button 
                    type='button'
                    className='btn btn-primary mr-2'
                    onClick={ () => redireccionarEdicion( producto )}>
                    Editar
                </button>
                <button 
                    type='button' 
                    className='btn btn-danger'
                    onClick={ () => confirmarEliminarProducto( id ) }>
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Producto 