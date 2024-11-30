// src/components/BaixarDados.tsx

import { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./BaixarDados.css";

interface IPieChartData {
    id: number;
    value: number;
    label: string;
}

interface IProduct {
    sequenceIdProduct: number;
    sequenceIdUser: number;
    product: string;
    description: string;
    plant: string;
    value: number;
    unit: string;
    quantity: number;
}

interface IProductStock {
    sequenceIdProductStock: number;
    sequenceIdUser: number;
    sequenceIdProduct: number;
    date: Date;
    removed: number;
}

interface IMergedProduct extends IProduct {
    totalRemoved: number;
}

interface UserData {
    sequenceIdUser: number;
    email: string;
    name: string;
    companyName: string;
}

interface DashboardProps {
    userData: UserData;
}

function BaixarDados({ userData }: DashboardProps) {
    const [isExcel, setIsExcel] = useState<boolean>(false);
    const [isPDF, setIsPDF] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar os dados da API
    const fetchData = async (): Promise<IPieChartData[]> => {
        try {
            // Substitua a URL abaixo pela sua rota real de API
            const response = await axios.get<IPieChartData[]>(`http://localhost:3000/product-stock/pie/get/${userData.sequenceIdUser}`);
            return response.data;
        } catch (err) {
            throw new Error('Erro ao buscar dados da API.');
        }
    };

    // Função para gerar e baixar o arquivo Excel
    const downloadExcel = (data: IPieChartData[]) => {
        // Converter os dados JSON para uma planilha
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

        // Gerar um buffer binário do workbook
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Criar um blob e iniciar o download
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'dados.xlsx');
    };

    // Função para gerar e baixar o arquivo PDF
    const downloadPDF = async (data: IPieChartData[]) => {
        // Criar um documento jsPDF
        const doc = new jsPDF();

        // Criar um elemento HTML temporário para renderizar os dados
        const pdfContent = document.createElement('div');
        pdfContent.style.padding = '20px';
        pdfContent.style.background = '#fff';
        pdfContent.style.color = '#000';
        pdfContent.style.fontFamily = 'Arial, sans-serif';
        pdfContent.style.width = '800px'; // Definir uma largura fixa para melhor renderização

        const title = document.createElement('h1');
        title.textContent = 'Dados dos Produtos';
        pdfContent.appendChild(title);

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';

        // Cabeçalho da tabela
        const headerRow = document.createElement('tr');

        const headers = ['ID', 'Valor', 'Produto'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.border = '1px solid #000';
            th.style.padding = '8px';
            th.style.backgroundColor = '#f2f2f2';
            th.style.textAlign = 'left';
            table.appendChild(th);
        });
        table.appendChild(headerRow);

        // Linhas da tabela
        data.forEach(item => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id.toString();
            idCell.style.border = '1px solid #000';
            idCell.style.padding = '8px';
            row.appendChild(idCell);

            const valueCell = document.createElement('td');
            valueCell.textContent = item.value.toString();
            valueCell.style.border = '1px solid #000';
            valueCell.style.padding = '8px';
            row.appendChild(valueCell);

            const labelCell = document.createElement('td');
            labelCell.textContent = item.label;
            labelCell.style.border = '1px solid #000';
            labelCell.style.padding = '8px';
            row.appendChild(labelCell);

            table.appendChild(row);
        });

        pdfContent.appendChild(table);

        // Anexar o conteúdo temporário ao body
        document.body.appendChild(pdfContent);

        try {
            // Usar html2canvas para capturar o conteúdo
            const canvas = await html2canvas(pdfContent, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');

            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save('dados.pdf');
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
            alert('Ocorreu um erro ao gerar o PDF.');
        } finally {
            // Remover o conteúdo temporário do DOM
            document.body.removeChild(pdfContent);
        }
    };

    // Função principal para lidar com o download
    const handleDownload = async () => {
        if (!isExcel && !isPDF) {
            alert('Por favor, selecione pelo menos um formato para baixar os dados.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await fetchData();

            if (isExcel) {
                downloadExcel(data);
            }

            if (isPDF) {
                await downloadPDF(data);
            }

            alert('Download realizado com sucesso!');
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao baixar os dados. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Baixar Dados</h1>
            <p>Selecione os formatos que deseja baixar os dados e depois clique em baixar</p>
            <div className="baixardados-forms">
                <div>
                    <label htmlFor="excel">Excel</label>
                    <input
                        id="excel"
                        type="checkbox"
                        checked={isExcel}
                        onChange={(e) => setIsExcel(e.target.checked)}
                    />
                </div>
                <div>
                    <label htmlFor="pdf">PDF</label>
                    <input
                        id="pdf"
                        type="checkbox"
                        checked={isPDF}
                        onChange={(e) => setIsPDF(e.target.checked)}
                    />
                </div>
                <button onClick={handleDownload} disabled={loading}>
                    {loading ? 'Baixando...' : 'Baixar'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
        </>
    )
}

export default BaixarDados;
