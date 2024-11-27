import { useRef, useState } from "react";
import "./Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const formRef = useRef<HTMLFormElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAgree, setTermsAgree] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        if (!termsAgree) {
            alert("Aceite os termos e serviços para realizar o cadastro")
            return
        }

        const formData = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            companyName: companyRef.current?.value,
            password: passwordRef.current?.value,
            confirmPassword: confirmPasswordRef.current?.value
        };

        try {
            await axios.post("http://localhost:3000/user/create", formData)

            alert("Conta criada com sucesso")
            
            navigate("/");
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert(error.response?.data.error)
                return
            } else {
                alert("Erro ao cadastrar empresa, consulte o console para mais informações.")
                console.error(error)
                return
            }
        }
    }

    return (
        <div className="register-body">
            <div className="register-container">
                <div>
                    <span className="register-tittle-container">
                        <h1>Cadastro</h1>
                        <hr />
                    </span>
                    <form ref={formRef} className="register-forms-container">
                        <input ref={nameRef} placeholder="Nome" />
                        <input ref={emailRef} placeholder="Email" />
                        <input ref={companyRef} placeholder="Nome da empresa" />
                        <div className="register-password-container">
                            <input
                                ref={passwordRef} type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                            />
                            <FontAwesomeIcon className="register-password-icon" onClick={togglePasswordVisibility} icon={showPassword ? faEyeSlash : faEye} />
                        </div>
                        <div className="register-password-container">
                            <input
                                ref={confirmPasswordRef} type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirme a senha"
                            />
                            <FontAwesomeIcon className="register-password-icon" onClick={toggleConfirmPasswordVisibility} icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </div>
                    </form>
                    <div>
                        <input onClick={() => setTermsAgree(!termsAgree)} type="checkbox" id="terms" />
                        <label htmlFor="terms">Concordo com os termos & condiçoes</label>
                    </div>
                    <button onClick={handleRegister}><b>Cadastrar</b></button>
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