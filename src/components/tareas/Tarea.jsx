import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({tarea}) => {

    const tareaContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareaContext;

    //Elimina Tarea
    const onClickEliminarTarea = idTarea => {        
        eliminarTarea(idTarea, tarea.proyecto);
        obtenerTareas(tarea.proyecto);
    }

    //Cambiar Estado Tarea
    const onClickCambiarEstadoTarea = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        
        actualizarTarea(tarea);
    }

    //Agrega una tarea actual cuando el usuario desea Editarla
    const onClickEditar = tarea => {
        guardarTareaActual(tarea);

    }
    

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                 ? 
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => onClickCambiarEstadoTarea(tarea)}
                        >Completo</button>
                    )
                 :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => onClickCambiarEstadoTarea(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => onClickEditar(tarea)}
                >Editar
                </button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickEliminarTarea(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;