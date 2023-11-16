import { useEffect, useState } from "react"
import axios from "axios"

interface LoginPayload {
	username: string
	password: string
}

interface LoginProps {
	apiDomain: string | undefined
}

const Login: React.FC<LoginProps> = ({ apiDomain }) => {
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
			.post(`${apiDomain}/auth/login`, payload)
			.then((response) => {
				setMessage(`JC's FrontendStatus: ${response.data.status}`)
			})
			.catch((error) => {
				if (error.response.status === 401) {
					setMessage(`UNAUTHORIZED!!  Your credentials are wrong!`)
				} else if (error.response.status === 404) {
					setMessage(`UNAUTHORIZED!!  Your credentials are wrong!`)
				} else if (error.response.status === 500) {
					setMessage(`UNAUTHORIZED!!  Your credentials are wrong!`)
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
			<form onSubmit={submitLogin} className="login-form">
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
