import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import "./Dashboard.css"

interface LineChartData {
    data: number[];
}

function Dashboard() {
    const [lineChartData, setLineChartData] = useState<LineChartData>({ data: [] })
    const [selectedProduct, setSelectedProduct] = useState("")

    function handleChangeLineChart(event: React.ChangeEvent<HTMLSelectElement>) {
        const product = event.target.value;
        setSelectedProduct(product)
        switch (product) {
            case "Produto A":
                setLineChartData({ data: [2, 5.5, 2, 8.5, 1.5, 5] });
                break;
            case "Produto B":
                setLineChartData({ data: [2, 7, 4, 9, 3, 10] });
                break;
            default:
                setLineChartData({ data: [] });

        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="dashboard-charts-container">
                <div>
                    <label>Produtos: </label>
                    <select value={selectedProduct} onChange={handleChangeLineChart}>
                        <option value="" disabled>Por favor selecione um produto</option>
                        <option value={"Produto A"}>Produto A</option>
                        <option value={"Produto B"}>Produto B</option>
                    </select>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[{ data: lineChartData.data }]}
                        width={500}
                        height={300}
                    />
                </div>
                <div>
                    <PieChart
                        colors={['#3D63DD', 'blue']}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'Produto A' },
                                    { id: 1, value: 15, label: 'Produto B' },
                                ],
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
        </div>
    )
}

export default Dashboard