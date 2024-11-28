import React, { useState } from "react";
import ProdutosComProviders from "./ProductTable";
import * as XLSX from 'xlsx';
import "./EnviarDados.css";
import { Product } from "./ProductTable";

interface UserData {
    sequenceIdUser: number;
    email: string;
    name: string;
    companyName: string;
}

interface ProdutosProps {
    userData: UserData;
}

function EnviarDados({ userData }: ProdutosProps) {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [tableData, setTableData] = useState<Product[]>([]);

    let idCounter = 0;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file.name);
            readExcel(file);
        }
    };

    const baixarModelo = () => {
        const filePath = '/Modelo_Produtos.xlsx';
        const link = document.createElement('a');
        link.href = filePath;
        link.download = 'Modelo_Produtos.xlsx';
        link.click();
    };

    const readExcel = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = e.target?.result;
            if (data) {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const rawData: (string | number | undefined)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const jsonData: Product[] = [];

                for (let i = 3; i < rawData.length; i++) {
                    const row = rawData[i];

                    if (row.slice(0, 6).every(cell => cell !== undefined && cell !== null && cell !== "")) {
                        if (row.length === 6) {
                            const entry: Product = {
                                id: `product-${Date.now()}-${idCounter}`,
                                product: String(row[0] ?? ""),
                                description: String(row[1] ?? ""),
                                plant: String(row[2] ?? ""),
                                value: Number(row[3] ?? 0),
                                unit: String(row[4] ?? ""),
                                quantity: Number(row[5] ?? 0),
                            };
                            jsonData.push(entry);
                            idCounter++;
                        }
                    }
                }

                setTableData(jsonData);
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="enviardados-container">
            <h1>Enviar Dados</h1>
            <p>Envie seus produtos em formato Excel para adicionar diretamente à tabela.</p>
            <div>
                <div className="enviardados-buttons-container">
                    <label htmlFor="file" className="upload-button">
                        <i className="fas fa-upload"></i> Enviar Arquivo
                    </label>
                    <input id="file" type="file" onChange={handleFileChange} />
                    <button className="download-button" onClick={baixarModelo}>
                        <i className="fas fa-file-download"></i> Baixar Modelo
                    </button>
                </div>
                {selectedFile && <p className="selected-file">Arquivo Selecionado: {selectedFile}</p>}
                <h3>Prévia:</h3>
                <div>
                    <ProdutosComProviders tableData={tableData} userData={userData} />
                </div>
            </div>
        </div>
    );
}

export default EnviarDados;
