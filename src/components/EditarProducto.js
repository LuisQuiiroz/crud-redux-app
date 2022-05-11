import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Navegación
import { useNavigate } from 'react-router-dom';
// Redux actions
import { guardarEditarProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // nuevo state de producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    });

    // Obtiene el producto a editar del state
    const productoEditar = useSelector((state) => (state.productos.productoEditar));
    const alerta = useSelector((state) => state.alerta.alerta);


    // establece el produto obtenido del state en lavariable de producto, para que su contenido pueda ser mostrado en los inputs
    useEffect(() => {
        setProducto(productoEditar);
    }, [productoEditar]);

    // Si por alguna razón(ej, modificar el link) el producto a editar no está en el state retorna al inicio
    if (!productoEditar) {
        navigate('/');
        return null;
    }

    const onChangeFormulario = (e) => {
        setProducto({
            ...producto,
            // nombre del input : valor del input
            [e.target.name]: e.target.value
        })
    }

    const { nombre, precio } = producto;

    const submitEditarProducto = e => {
        e.preventDefault();
        // validacion del formulario
        if (nombre.trim() === '' || precio <= 0) {

            const alerta = {
                msg: 'Todos los campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            // si hay errores,e stablece una alerta y se la muetsra al usuario
            dispatch(mostrarAlerta(alerta));

            return;
        }

        // establece como null la alerta
        dispatch(ocultarAlertaAction());

        //  le pasa el producto editado para actualizarlo
        dispatch(guardarEditarProductoAction(producto));
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='row justify-content-center mt-4'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='text-center mb-4 font-weight-bold'>
                                Editar producto
                            </h2>
                            {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
                            <form
                                onSubmit={submitEditarProducto}
                                autoComplete='off'
                            >
                                <div className='form-group'>
                                    <label>Nombre Producto</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Nombre Producto'
                                        name='nombre'
                                        value={nombre}
                                        onChange={onChangeFormulario}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Precio Producto</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Precio Producto'
                                        name='precio'
                                        value={precio}
                                        onChange={onChangeFormulario}
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                    Guardar cambios
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditarProducto;
