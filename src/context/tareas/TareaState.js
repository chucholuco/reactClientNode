import React, { useReducer } from "react";
//import { v4 as uuidv4 } from 'uuid';
import clienteAxios from '../../config/axios';
import TareaContext from "./TareaContext";
import TareaReducer from "./TareaReducer";
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, 
        ELIMINAR_TAREA, TAREA_ACTUAL, 
        ACTUALIZAR_TAREA, LIMPIAR_TAREA } from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada:null
  };

  //Creando dispatch y el state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear las funciones

  //Obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {    
    try{
      const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
    })
     }catch(error){
        console.log(error);
     }
  }

  //Agregar la tarea de un proyecto
  const agregarTarea = async tarea => {
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      
      try {
        dispatch({
          type: AGREGAR_TAREA,
          payload: resultado.data.tarea
      })
      } catch (error) {
        console.log(error);
      }
  }

  //Validar la tarea y muestra un error en caso de que sea necesario
  const validarTarea = () => {
      dispatch({
          type: VALIDAR_TAREA          
      })
  }

  //Eliminar Tarea
  const eliminarTarea = async (tareaId, proyectoId) => {      
      await clienteAxios.delete(`/api/tareas/${tareaId}`, {params: {proyecto: proyectoId}});
      try {
        dispatch({
          type: ELIMINAR_TAREA,
          payload: tareaId
      })
      } catch (error) {
        console.log(error);
      }
  }

  //Actualizar Tarea
  const actualizarTarea = async tarea =>{
    
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      })
    } catch (error) {
      console.log(error);
    }
  }

  //Extrae una tarea para Edicion
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }


  //ELimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
      value={{        
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,    
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
