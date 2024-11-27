import { useEffect } from "react"
import "./PageNotFound.css"

function PageNotFound() {

    useEffect(() => {
        localStorage.clear()
        sessionStorage.clear()
    }, [])

    return (
        <>
            <div className="page-not-found-container">
                <h1 className="page-not-found-oops"><span>O</span>OPS!</h1>
                <h2>Erro 404</h2>
                <h3>Algo de errado aconteceu<br /> ao carregar a página</h3>
            </div>


            <div style={{overflow:"hidden"}}>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>
        </>
    )
}

export default PageNotFound