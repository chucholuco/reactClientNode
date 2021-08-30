import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertaContext from '../../context/alertas/AlertaContext';

const ListadoProyectos = () => {

    //Extraer proyectos de state inicial
    const proyectoContext = useContext(ProyectoContext);
    const {proyectos, mensaje, obtenerProyectos} = proyectoContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //Obtener proyectos cuando carga el componente
    useEffect(() =>{
        if(mensaje){ //Si hay un error
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje]);

    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay Proyectos, comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map((proyecto, index) =>(                    
                <CSSTransition 
                    key={index}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Proyecto proyecto={proyecto}/>                 
                </CSSTransition>               
                ))}
            </TransitionGroup>
            
        </ul>
     );
}
 
export default ListadoProyectos;