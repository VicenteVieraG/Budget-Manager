import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import {generarId} from './helpers'
import Filtros from './components/Filtros'

function App() {
	const [presupuesto,setPresupuesto] =useState(
		Number(localStorage.getItem("presupuesto")) ?? 0
	);
	const [gastos, setGastos]=useState(
		localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
	)
	const [isValidPresupuesto,setIsValidPresupuesto]=useState(false);
	const [modal, setModal] =useState(false)
	const [animarModal, setAnimarModal] =useState(false)
	const [gastoEditar,setGastoEditar]=useState({})
	const [filtro,setFiltro]=useState("")
	const [gastosFiltrados,setGastosFiltrados]=useState("")

	useEffect(()=>{
		if(Object.keys(gastoEditar).length>0){
			setModal(true)

			setTimeout(() => {
				setAnimarModal(true);
			},500)
		}
	},[gastoEditar])

	useEffect(()=>{
		localStorage.setItem("presupuesto",presupuesto ?? 0)
	},[presupuesto])

	useEffect(()=>{
		localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])
	},[gastos])

	useEffect(function () {
		const presupuestoLS=Number(localStorage.getItem("presupuesto")) ?? 0
		if(presupuestoLS>0){
			setIsValidPresupuesto(true)
		}
	},[])

	useEffect(()=>{
		if(filtro!==""){
			//Filtrar gastos
			const gastosFiltrados = gastos.filter(gasto=>gasto.categoria ===filtro)
			setGastosFiltrados(gastosFiltrados)
		}
	},[filtro])

	const handleNuevoGasto = () =>{
		setModal(true)
		setGastoEditar({})

		setTimeout(() => {
			setAnimarModal(true);
		},500)
	}


	const guardarGasto = (gasto) =>{
		if(gasto.id != ""){
			//Actualizar
			const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)	

			setGastos(gastosActualizados);

			setGastoEditar({})
		}else{
			//Nuevo Gasto
			gasto.id=generarId()
			gasto.fecha=Date.now()
			setGastos([...gastos,gasto])
		}
		
		setAnimarModal(false)

		setTimeout(() => {
			setModal(false)
		},500)
	}

	const eliminarGasto = id =>{
		const gastosActualizados =gastos.filter(gasto => gasto.id !== id)

		setGastos(gastosActualizados)
	}

	return (
		<div className={modal ? "fijar" : ""}>
			<Header
				gastos={gastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
				setGastos={setGastos}
			/>

			{isValidPresupuesto && (
				<>
					<main>
						<Filtros
							filtro={filtro}
							setFiltro={setFiltro}
						/>
						<ListadoGastos
							setGastoEditar={setGastoEditar}
							gastos={gastos}
							eliminarGasto={eliminarGasto}
							gastosFiltrados={gastosFiltrados}
							filtro={filtro}
						/>
					</main>
					<div className="nuevo-gasto">
						<img
							src={IconoNuevoGasto}
							alt="icono nuevo gasto"
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}

			{modal && <Modal 
						setModal={setModal} 
						animarModal={animarModal} 
						setAnimarModal={setAnimarModal}
						guardarGasto={guardarGasto}
						gastoEditar={gastoEditar}
						setGastoEditar={setGastoEditar}
						/>
			}
		</div>
	)
}

export default App
