import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
    const navigate = useNavigate();
    
    function handleLogin(){
        navigate("/dashboard");
    }

    return (
        <div className="login-container">
            <div className="login-sidebar-container">
                <h1>CloudStock</h1>
                <form className="login-forms">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input placeholder="Email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password" >Senha</label>
                        <input placeholder="Senha" id="password" />
                    </div>
                    <span>
                        <div className="login-remember-me-container">
                            <input type="checkbox" id="rememberMe"/>
                            <label htmlFor="rememberMe">Lembre-se de mim</label>
                        </div>
                        <a href="/forgot-password">Esqueceu sua senha?</a>
                    </span>
                    <button onClick={() => handleLogin()}><b>Login</b></button>
                    <p>Não tem uma conta ? <a href="/register">Crie aqui</a></p>
                </form>
            </div>
            <img />
        </div>
    )
}

export default Login