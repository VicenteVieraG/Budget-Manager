import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje.jsx"
import {useState,useEffect} from "react";

const Modal = ({
	setModal,
	animarModal,
	setAnimarModal,
	guardarGasto,
	gastoEditar
}) => {
	const [nombre, setNombre]=useState("");
	const [cantidad, setCantidad]=useState(0);
	const [categoria, setCategoria]=useState("");
	const [mensaje, setMensaje] = useState("");
	const [fecha, setFecha]=useState("")
	const [id, setId] = useState("");

	useEffect(()=>{
		if(Object.keys(gastoEditar).length>0){
			setNombre(gastoEditar.nombre)
			setCantidad(gastoEditar.cantidad)
			setCategoria(gastoEditar.categoria)
			setFecha(gastoEditar.fecha)
			setId(gastoEditar.id)
		}
	},[])

	const ocultarModal= () => {
		setAnimarModal(false)

		setTimeout(() => {
			setModal(false)
		},500)
	}

	const handleSubmit= (e) =>{
		e.preventDefault();

		if([nombre, cantidad, categoria].includes("")){
			setMensaje("Todos los Campos Son Obligatorios")

			setTimeout(() => {
				setMensaje("");
			},3000)

			return;
		}

		const json={nombre,cantidad,categoria,id,fecha}
		guardarGasto(json)
	}

  return (
	<div className="modal">
		<div className="cerrar-modal">
			<img
				style={{cursor: "pointer"}}
				src={CerrarBtn}
				alt="Cerrar Modal"
				onClick={ocultarModal}
				
			/>
		</div>

		<form
			onSubmit={handleSubmit} 
			className={`formulario ${animarModal ? "animar" : "cerrar"}`}
		>
			<legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

			{mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

			<div className="campo">
				<label htmlFor="nombre">Nombre Gasto</label>
				<input
					id="nombre"
					type="text"
					placeholder="Añade el Nombre del Gasto"
					value={nombre}
					onChange={e => setNombre(e.target.value)}
				/>
			</div>
			
			<div className="campo">
				<label htmlFor="cantidad">Canidad</label>
				<input
					id="cantidad"
					type="number"
					placeholder="Añade la Cantidad del Gasto: ej. 300"
					//value={cantidad}
					onChange={e => setCantidad(Number(e.target.value))}
				/>
			</div>

			<div className="campo">
				<label htmlFor="categoria">Canidad</label>
				
				<select 
					id="categoria"
					value={categoria}
					onChange={e => setCategoria(e.target.value)}
				>
					<option value="Seleccione">-- Seleccione --</option>
					<option value="Ahorro">Ahorro</option>
					<option value="Comida">Comida</option>
					<option value="Casa">Casa</option>
					<option value="Gastos">Gasto Varios</option>
					<option value="Ocio">Ocio</option>
					<option value="Salud">Salud</option>
					<option value="Suscripciones">Suscripciones</option>
				</select>
			</div>

			<input
				type="submit"
				value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
			/>
		</form>
	</div>
	);
};

export default Modal;


