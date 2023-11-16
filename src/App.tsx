import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

import Login from "./pages/Login"

function App() {
	const [data, setData] = useState("")

	const fetchMainPage = async () => {
		const response = await axios.get("http://localhost:3000/")
		setData(response.data)
	}

	useEffect(() => {
		fetchMainPage()
	}, [])

	return (
		<>
			{data}
			<Login />
		</>
	)
}

export default App
