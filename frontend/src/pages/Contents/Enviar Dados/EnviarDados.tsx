import React, { useState } from "react";
import * as XLSX from "xlsx";
import ProdutosComProviders from "./ProductTable"
import "./EnviarDados.css"

function EnviarDados() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };

    const baixarModelo = () => {
    
        const dadosModelo = [
          ["ID", "Nome do Produto", "Preço", "Quantidade", "Categoria"],
        ];
    
        const csvContent = dadosModelo
          .map((linha) => linha.join(","))
          .join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Modelo_Produtos.csv";
    
        link.click();
      };

    return (
        <div className="enviardados-container">
            <h1>Enviar Dados</h1>
            <p>Envie seus produtos em formato xml para adicionar automaticamente ao banco de dados da CloudStoc<br />
                (Preencha conforme o modelo para menor chance de erros)</p>
            <div>
                <div className="enviardados-buttons-container">
                    <label htmlFor="file">Enviar</label>
                    <input id="file" type="file" onChange={handleFileChange} />
                    {selectedFile ? <p>{selectedFile}</p> : <p>Selecione um arquivo</p>}
                    <button onClick={baixarModelo}>Baixar Modelo</button>
                </div>
                <h3>Previa:</h3>
                <div>
                    <ProdutosComProviders />
                </div>
            </div>
        </div>
    )
}

export default EnviarDados