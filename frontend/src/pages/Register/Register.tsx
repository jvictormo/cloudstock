import { useState } from "react";
import "./Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <div>
                    <span className="register-tittle-container">
                        <h1>Cadastro</h1>
                        <hr />
                    </span>
                    <form className="register-forms-container">
                        <input placeholder="Nome" />
                        <input placeholder="Email" />
                        <input placeholder="Nome da empresa" />
                        <div className="register-password-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Senha" 
                            />
                                <FontAwesomeIcon className="register-password-icon" onClick={togglePasswordVisibility} icon={showPassword ? faEyeSlash : faEye} />
                        </div>
                        <div className="register-password-container">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Confirme a senha" 
                            />
                                <FontAwesomeIcon className="register-password-icon" onClick={toggleConfirmPasswordVisibility} icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </div>
                    </form>
                    <div>
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">Concordo com os termos & condiçoes</label>
                    </div>
                    <button><b>Cadastrar</b></button>
                    <p>Já tem uma conta ? <a href="/login">Faça login aqui</a></p>
                </div>
            </div>

            <div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </div>
    )
}

export default Register