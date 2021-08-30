import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types';

const AlertaReducer = (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        case OCULTAR_ALERTA:    
            return {
                alerta: null
            }    
        default:
            return state;
    }
}

export default AlertaReducer;