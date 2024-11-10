import { useState } from "react"
import SideBar from "../../components/SideBar/SideBar"
import BaixarDados from "./Baixar Dados/BaixarDados"
import Dashboard from "./Dashboard/Dashboard"
import EnviarDados from "./Enviar Dados/EnviarDados"
import Produtos from "./Produtos/Produtos"

function Contents() {
    const [selectedButton, setSelectedButton] = useState("Dashboard");

    const renderContent = () => {
        switch (selectedButton) {
            case "Dashboard":
                return <Dashboard />;
            case "Produtos":
                return <Produtos />;
            case "Baixar Dados":
                return <BaixarDados />;
            case "Enviar Dados":
                return <EnviarDados />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <>
            <SideBar setSelectedButtonFunction={setSelectedButton}/>
            <div className="application-content">
                {renderContent()}
            </div>
        </>
    )
}

export default Contents