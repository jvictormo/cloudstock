import "./BaixarDados.css"

function BaixarDados() {
    return (
        <>
            <h1>Baixar dados</h1>
            <p>Selecione os formatos que deseja baixar os dados e depois clique em baixar</p>
            <div className="baixardados-forms">
                <div>
                    <label htmlFor="excel">Excel</label>
                    <input id="excel" type="checkbox" />
                </div>
                <div>
                    <label htmlFor="pdf">PDF</label>
                    <input id="pdf" type="checkbox" />
                </div>
                <button>Baixar</button>
            </div>
        </>
    )
}

export default BaixarDados