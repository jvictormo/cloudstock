import { useState } from "react"
import SideBar from "../../components/SideBar/SideBar"
import BaixarDados from "./Baixar Dados/BaixarDados"
import Dashboard from "./Dashboard/Dashboard"
import EnviarDados from "./Enviar Dados/EnviarDados"
import Produtos from "./Produtos/Produtos"
import useAuth from "../../../Hooks/useAuth"
import { useNavigate } from "react-router-dom"
import "./Content.css"
import BaixaProdutos from "./Baixa Produtos/BaixaProdutos"

function Contents() {
    const [selectedButton, setSelectedButton] = useState("Dashboard");

    const navigate = useNavigate();

    const { userData, loading, error } = useAuth();

    const renderContent = () => {
        switch (selectedButton) {
            case "Dashboard":
                if (userData) {
                    return <Dashboard userData={userData} />;
                } else {
                    navigate("/404")
                    return null
                }
            case "Produtos":
                if (userData) {
                    return <Produtos userData={userData} />;
                } else {
                    navigate("/404")
                    return null
                }
            case "Baixa Produtos":
                if (userData) {
                    return <BaixaProdutos userData={userData} />;
                } else {
                    navigate("/404")
                    return null
                }
            case "Baixar Dados":
                case "Enviar Dados":
                    if (userData) {
                        return <BaixarDados userData={userData} />;
                    } else {
                        navigate("/404")
                        return null
                    }
            case "Enviar Dados":
                if (userData) {
                    return <EnviarDados userData={userData} />;
                } else {
                    navigate("/404")
                    return null
                }
            default:
                if (userData) {
                    return <BaixaProdutos userData={userData} />;
                } else {
                    navigate("/404")
                    return null
                }
        }
    };

    if (loading) {
        return <div className="loading-container"><h3>Carregando...</h3></div>;
    }

    if (error) {
        navigate("/404");
    }

    return (
        <>
            <SideBar setSelectedButtonFunction={setSelectedButton} userData={userData}/>
            <div className="application-content">
                {renderContent()}
            </div>
        </>
    )
}

export default Contents