import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import "./Login.css"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const userData = await axios.get(`http://localhost:3000/user/login/${email}/${password}`)

            console.log(userData.response.data)
            if (userData.status === 500) {
                alert("Erro ao tentar fazer login")
            } else if (userData.status === 401) {
                if (userData.data.error === "Incorrect password.") {
                    alert("Senha Incorreta")
                } else {
                    alert("Usuário não encontrado")
                }
            } else if (userData.status === 200) {
                //navigate("/dashboard");
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className="login-container">
            <div className="login-sidebar-container">
                <h1>CloudStock</h1>
                <form className="login-forms" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password" >Senha</label>
                        <input onChange={(e) => setPassword(e.target.value)} placeholder="Senha" id="password" type="password" />
                    </div>
                    <span>
                        <div className="login-remember-me-container">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Lembre-se de mim</label>
                        </div>
                        <a href="/forgot-password">Esqueceu sua senha?</a>
                    </span>
                    <button type="submit"><b>Login</b></button>
                    <p>Não tem uma conta ? <a href="/register">Crie aqui</a></p>
                </form>
            </div>
            <img />
        </div>
    )
}

export default Login