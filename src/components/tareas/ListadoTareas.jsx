import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {tareasProyecto} = tareaContext;

    //Si no ha proyecto seleccionado 
    if(!proyecto) 
        return <h2>Selecciona un Proyecto</h2>;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Elimina Proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas"> 
                {tareasProyecto.length === 0
                    ? (<li className="tarea"><p>No hay Tareas</p></li>)
                    : <TransitionGroup>
                           {tareasProyecto.map((tarea, index) =>(
                               <CSSTransition 
                                    key={index}
                                    timeout={200}
                                    classNames="tarea"
                                >
                                   <Tarea                                         
                                        tarea={tarea}
                                    />
                               </CSSTransition>
                            ))}  
                      </TransitionGroup>
                }           
            </ul>
            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
            
        </Fragment>
     );
}
 
export default ListadoTareas;