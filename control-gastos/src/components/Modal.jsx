import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje.jsx"
import {useState} from "react";

const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto}) => {
	const [nombre, setNombre]=useState("");
	const [cantidad, setCantidad]=useState(0);
	const [categoria, setCategoria]=useState("");
	const [mensaje, setMensaje] = useState("");

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

		guardarGasto({nombre,cantidad,categoria})
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
			<legend>Nuevo Gasto</legend>

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
				value="Añadir Gasto"
			/>
		</form>
	</div>
	);
};

export default Modal;


