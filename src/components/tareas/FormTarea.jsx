import React, { useContext, useState, useEffect } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    //Extraer si un proyecto está activo
    const proyectoContext = useContext(ProyectoContext);
    const {proyecto} = proyectoContext

    //Extraer el contexto de tarea
    const tareaContext = useContext(TareaContext);
    const {errorTarea, tareaSeleccionada, agregarTarea, validarTarea, 
           obtenerTareas, actualizarTarea, limpiarTarea} = tareaContext;

    //Efect que detecta si hay una tarea seleccionada
    useEffect(() =>{
        if(tareaSeleccionada !== null){
             setTarea(tareaSeleccionada);
        }else{
            setTarea({
                nombre:''
            })
        }
    }, [tareaSeleccionada]);

    const [tarea, setTarea] = useState({
        nombre: ''
    });

    //Extraer el nombre del proyecto
    const {nombre} = tarea

    //Si no hay un proyecto seleccionado
    if(!proyecto) 
        return null;
    
    //Array destructuring para extrael el proyecto actual(objeto), ya que está como arreglo
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        }); 
    }

    const onSubmit = event => {
        event.preventDefault(); 
        
        //Validar
        if(nombre.trim() === ''){
            validarTarea()
            return;
        }

        //Si es Edicion o Nueva Tarea
        if(tareaSeleccionada === null){
            //Agregar una nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;            
            agregarTarea(tarea);
        }else{
            //Actualiza Tarea existente
            actualizarTarea(tarea);
            limpiarTarea(); //Limpia la tarea seleccionada del state
        }
 
        //Obtener el listado de tareas
        obtenerTareas(proyectoActual._id);

        //Reiniciar el formulario
        setTarea({
            nombre: ''
        });
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null}
        </div>
     );
}
 
export default FormTarea;