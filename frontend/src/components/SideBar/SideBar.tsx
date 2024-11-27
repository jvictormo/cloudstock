import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faDownload, faUpload, faTableColumns, faCashRegister, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";

interface SideBarProps {
    setSelectedButtonFunction: (page: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setSelectedButtonFunction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState("Dashboard")

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    function handleChangePage(page: string) {
        if (page == "Logout") {
            localStorage.clear()
            sessionStorage.clear()
            window.location.href = "/"
            return
        }
        setSelectedButton(page)
        setSelectedButtonFunction(page)
    }

    return (
        <div className={`sidebar-container ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <button onClick={toggleSidebar} className="sidebar-menu-toggle">
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            <nav className={`sidebar-buttons-nav ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <button onClick={() => handleChangePage("Dashboard")} className={`sidebar-button ${selectedButton === "Dashboard" ? "sidebar-page-selected" : ""}`}>
                    <FontAwesomeIcon icon={faTableColumns} />
                    <span className="sidebar-button-text">Dashboard</span>
                </button>
                <button onClick={() => handleChangePage("Produtos")} className={`sidebar-button ${selectedButton === "Produtos" ? "sidebar-page-selected" : ""}`}>
                    <FontAwesomeIcon icon={faCashRegister} />
                    <span className="sidebar-button-text">Produtos</span>
                </button>
                <button onClick={() => handleChangePage("Baixar Dados")} className={`sidebar-button ${selectedButton === "Baixar Dados" ? "sidebar-page-selected" : ""}`}>
                    <FontAwesomeIcon icon={faDownload} />
                    <span className="sidebar-button-text">Baixar Dados</span>
                </button>
                <button onClick={() => handleChangePage("Enviar Dados")} className={`sidebar-button ${selectedButton === "Enviar Dados" ? "sidebar-page-selected" : ""}`}>
                    <FontAwesomeIcon icon={faUpload} />
                    <span className="sidebar-button-text">Enviar Dados</span>
                </button>
                <button onClick={() => handleChangePage("Logout")} className="sidebar-button">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span className="sidebar-button-text">Logout</span>
                </button>
            </nav>
        </div>
    );
}

export default SideBar;
