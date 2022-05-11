import React, { useState } from 'react';

// navegación
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';


const NuevoProducto = () => {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    // utilizar ese Dispatch y te crea una funcion
    const dispatch = useDispatch();
    // dispatch es usado para llamar a las funciones que esten en los actions, se debe de hacer de esta manera

    // acceder al state del store
    const cargando = useSelector((state) => state.productos.loading);
    const error = useSelector((state) => state.productos.error);
    const alerta = useSelector((state) => state.alerta.alerta);

    // mandar llamar el action de productoActions
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

    // Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();
        // validacion del formulario
        if (nombre.trim() === '' || precio <= 0) {

            const alerta = {
                msg: 'Todos los campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            // se stablece una alerta, posteriormente se muestra al usuario
            dispatch(mostrarAlerta(alerta));

            return;
        }

        // establece como null la alerta
        dispatch(ocultarAlertaAction());

        // llama a la funcion mandando los detalles del producto para poder crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // redireccionar al home una vez añadido el producto
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='row justify-content-center mt-4'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='text-center mb-4 font-weight-bold'>
                                Agregar Producto
                            </h2>
                            {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
                            <form
                                autoComplete='off'
                                onSubmit={submitNuevoProducto}
                            >
                                <div className='form-group'>
                                    <label>Nombre Producto</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Nombre Producto'
                                        name='nombre'
                                        value={nombre}
                                        onChange={e => setNombre(e.target.value)}
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
                                        onChange={e => setPrecio(Number(e.target.value))}
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                    Agregar
                                </button>
                            </form>
                            {cargando ? <p>cargando...</p> : null}
                            {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error al agregar el producto</p> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NuevoProducto;
