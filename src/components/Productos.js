import React, { useEffect } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions';

import Producto from './Producto';

const Productos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Consultar API
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
    }, []);

    // obtener el state
    const productos = useSelector((state) => state.productos.productos);
    const error = useSelector((state) => state.productos.error);
    const loading = useSelector((state) => state.productos.loading);

    return (
        <div className='container'>
            {loading ? <h3 className=' text-center '>Cargando...</h3> : null}

            {

                productos.length === 0 ?
                    <>
                        {error ? <h3 className='alert alert-danger text-center mt-4'>Hubo un error al obtener los productos</h3> : <h2 className='text-center my-5'>No hay productos</h2>}
                    </> :
                    <div className='container'>
                        <h2 className='text-center my-5'>Listado de Productos</h2>
                        <table className='table table-striped text-center'>
                            <thead className='bg-primary table-dark'>
                                <tr>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Precio</th>
                                    <th scope='col'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productos.map((producto) => (
                                        <Producto
                                            key={producto.id}
                                            producto={producto}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
};

export default Productos;
