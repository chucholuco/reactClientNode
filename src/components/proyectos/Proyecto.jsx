import React, {useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({proyecto}) =>{

    //Obtener el estate de Proyecto
    const proyectosContext = useContext(ProyectoContext);
    const {proyectoActual} = proyectosContext;

    //Obtener el estate de Tarea
    const tareasContext = useContext(TareaContext);
    const {obtenerTareas} = tareasContext;

    //Funciona para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //Fijar un proyecto Actual
        obtenerTareas(id); //Filtrar las tareas por id del proyecto cuando se de click
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-black"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;