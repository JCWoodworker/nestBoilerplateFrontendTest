import { useEffect, useState } from "react"
import axios from "axios"

interface LoginPayload {
	username: string
	password: string
}

const Login: React.FC = () => {
	const [loginPayload, setLoginPayload] = useState<LoginPayload>({
		username: "",
		password: "",
	})
	const [message, setMessage] = useState<string>("")

	const submitLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		const payload = {
			...loginPayload,
		}
		await axios
			.post("http://localhost:3000/auth/login", payload)
			.then((response) => {
				setMessage(
					`JC's FrontendStatus: ${response.data.status}`
				)
			})
			.catch((error) => {
				if (error.response.status === 401) {
					setMessage(`UNAUTHORIZED!!  Your credentials are wrong you fucking twat!`)
				} else if (error.response.status === 404) {
					setMessage(`UNAUTHORIZED!!  Your credentials are wrong you fucking twat!`)
				} else if (error.response.status === 500) {
					setMessage(`UNAUTHORIZED!!  Your credentials are wrong you fucking twat!`)
				} else {
					setMessage(`JC's Frontend Error: ${error.message}`)
				}
			})
	}

	useEffect(() => {
		console.log(loginPayload)
	}, [loginPayload])
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={submitLogin}>
				<label>
					Username
					<input
						type="text"
						onChange={(e) =>
							setLoginPayload({ ...loginPayload, username: e.target.value })
						}
						value={loginPayload.username}
					></input>
				</label>
				<label>
					Password
					<input
						type="password"
						onChange={(e) =>
							setLoginPayload({ ...loginPayload, password: e.target.value })
						}
					></input>
				</label>
				<button type="submit">Submit</button>
			</form>
			{message}
		</div>
	)
}

export default Login
