import React, {Fragment, useContext, useState} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    //Obtener el estate del formulario
    const proyectosContext = useContext(ProyectoContext);
    const {formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //State para Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    const {nombre} = proyecto;

    //Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e =>{
        e.preventDefault();

        //Validar el nombre del proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        //Agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el form
        guardarProyecto({
            nombre:''
        });
    }

    //Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto
            </button>

            {
                formulario
                ?  
                    (
                        <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                onChange={onChangeProyecto}
                                value={nombre}
                            />
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />

                        </form>
                    )
                : null
            }
            
            {errorFormulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}
        </Fragment>
     );
}
 
export default NuevoProyecto;