import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import Login from "./pages/Login"

function App() {
	const [data, setData] = useState("")
	const apiDomain =
		import.meta.env.VITE_ENVIRONMENT === "development"
			? import.meta.env.VITE_DEVELOPMENT_API_DOMAIN
			: import.meta.env.VITE_ENVIRONMENT === "preprod"
			? import.meta.env.VITE_PREPROD_API_DOMAIN
			: import.meta.env.VITE_ENVIRONMENT === "production"
			? import.meta.env.VITE_PRODUCTION_API_DOMAIN 
			: import.meta.env.VITE_DEVELOPMENT_API_DOMAIN

	const fetchMainPage = async () => {
		const response = await axios.get(apiDomain)
		setData(response.data)
	}

	useEffect(() => {
		fetchMainPage()
	}, [])

	return (
		<>
			{data}
			<Login apiDomain={apiDomain} />
		</>
	)
}

export default App
