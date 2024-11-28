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
                return <Dashboard />;
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
                return <BaixarDados />;
            case "Enviar Dados":
                if (userData) {
                    return <EnviarDados userData={userData} />;
                } else {
                    navigate("/404")
                    return null
                }
            default:
                return <Dashboard />;
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
            <SideBar setSelectedButtonFunction={setSelectedButton} />
            <div className="application-content">
                {renderContent()}
            </div>
        </>
    )
}

export default Contents