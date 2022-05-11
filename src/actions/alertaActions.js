import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types';

/****** Muestra alerta ******/

export function mostrarAlerta( alerta ) {
    return ( dispatch ) => {
        dispatch( crearAlerta( alerta ))
    }
}

// establece un mensaje de alerta en el state, y es mostrado en el HTML
const crearAlerta = ( alerta ) => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

/****** Oculta alerta ******/
export function ocultarAlertaAction() {
    return ( dispatch ) => {
        dispatch( ocultarAlerta() )
    }
}
// Establece a null la alerta
const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
})