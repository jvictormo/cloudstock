// src/components/Dashboard.tsx

import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import "./Dashboard.css";
import axios from 'axios';
import { format, subMonths, isAfter, startOfMonth } from 'date-fns'; // Importar funções necessárias

interface LineChartData {
    xAxis: number[]; // Representa 1 a 6
    series: {
        label: string;
        data: number[];
    }[];
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

interface IProductStock {
    _id: string;
    sequenceIdUser: number;
    sequenceIdProduct: number;
    date: string;
    removed: number;
    sequenceIdProductStock: number;
    __v: number;
}

interface IProduct {
    _id: string;
    sequenceIdUser: number;
    product: string;
    description: string;
    plant: string;
    value: number;
    unit: string;
    quantity: number;
    sequenceIdProduct: number;
    __v: number;
    stock?: IProductStock[];
}

interface IMergedProduct extends IProduct {
    stock: IProductStock[];
}

function Dashboard({ userData }: DashboardProps) {
    const [products, setProducts] = useState<IMergedProduct[]>([]);
    const [pieData, setPieData] = useState([])
    const [lineChartData, setLineChartData] = useState<LineChartData>({ xAxis: [], series: [] });
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const responseChart = await axios.get(`http://localhost:3000/product-stock/get/${userData.sequenceIdUser}`);
                setProducts(responseChart.data);

                const responsePie = await axios.get(`http://localhost:3000/product-stock/pie/get/${userData.sequenceIdUser}`);
                setPieData(responsePie.data)
            } catch (error) {
                setError("Erro ao buscar dados de produtos, verifique o console para mais informações.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [userData.sequenceIdUser]);

    function handleChangeLineChart(event: React.ChangeEvent<HTMLSelectElement>) {
        const productName = event.target.value;
        setSelectedProduct(productName);

        const product = products.find(p => p.product === productName);
        if (product && product.stock.length > 0) {
            const sixMonthsAgo = subMonths(new Date(), 6);
            const startDate = startOfMonth(sixMonthsAgo);

            const recentStock = product.stock.filter(stock => isAfter(new Date(stock.date), startDate));

            const groupedStock: { [key: string]: number } = {};

            recentStock.forEach(stock => {
                const month = format(new Date(stock.date), 'MM/yyyy');
                if (groupedStock[month]) {
                    groupedStock[month] += stock.removed;
                } else {
                    groupedStock[month] = stock.removed;
                }
            });

            // Gerar uma lista dos últimos 6 meses no formato 'MM/yyyy'
            const lastSixMonths = Array.from({ length: 6 }, (_, index) => {
                const date = subMonths(new Date(), 5 - index); // 0 a 5
                return format(date, 'MM/yyyy');
            });

            // Mapear os meses para números de 1 a 6
            const xAxis = lastSixMonths.map((_, index) => index + 1); // [1, 2, 3, 4, 5, 6]
            // Obter os valores de 'removed' para cada mês, ou 0 se não houver dados
            const removedValues = lastSixMonths.map(month => groupedStock[month] || 0); // Soma ou 0

            // Verificar se há NaNs
            const hasNaN = xAxis.some(value => isNaN(value)) || removedValues.some(value => isNaN(value));
            if (hasNaN) {
                console.error("Dados inválidos encontrados:", { xAxis, removedValues });
                setLineChartData({ xAxis: [], series: [] });
                return;
            }

            setLineChartData({
                xAxis: xAxis,
                series: [
                    {
                        label: product.product,
                        data: removedValues,
                    }
                ]
            });
        } else {
            setLineChartData({ xAxis: [], series: [] });
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {loading ? (
                <p>Carregando dados...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="dashboard-charts-container">
                    <div>
                        <label htmlFor="product-select">Produtos: </label>
                        <select id="product-select" value={selectedProduct} onChange={handleChangeLineChart}>
                            <option value="" disabled>Por favor selecione um produto</option>
                            {products.map((prod) => (
                                <option key={prod.sequenceIdProduct} value={prod.product}>
                                    {prod.product}
                                </option>
                            ))}
                        </select>
                        {lineChartData.xAxis.length > 0 ? (
                            <LineChart
                                xAxis={[
                                    { 
                                        data: lineChartData.xAxis, 
                                        label: 'Mês',
                                    }
                                ]}
                                series={lineChartData.series}
                                width={500}
                                height={300}
                            />
                        ) : (
                            selectedProduct !== "" && <p>Nenhum dado de estoque disponível para o produto selecionado.</p>
                        )}
                    </div>
                    <div>
                        <PieChart
                            colors={['#3D63DD', 'blue']}
                            series={[
                                {
                                    data: pieData,
                                    innerRadius: 34,
                                    outerRadius: 101,
                                    paddingAngle: 3,
                                    cornerRadius: 6,
                                    startAngle: -45,
                                    endAngle: 360,
                                    cx: 150,
                                    cy: 150,
                                }
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;
