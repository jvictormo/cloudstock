import React, { useEffect, useState } from "react";
import "./BaixaProdutos.css";
import axios from "axios";

interface Product {
    sequenceIdProduct: string;
    product: string;
    description: string;
    plant: string;
    value: number;
    unit: string;
    quantity: number;
}

interface UserData {
    sequenceIdUser: number;
    email: string;
    name: string;
    companyName: string;
}

interface BaixaProdutosProps {
    userData: UserData;
}

export default function BaixaProdutos({ userData }: BaixaProdutosProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `http://localhost:3000/product/get/stock/${userData.sequenceIdUser}`
                );

                setProducts(response.data);
            } catch (error) {
                alert(
                    "Erro ao exibir produtos, cheque o console para mais informações"
                );
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(event.target.value);
        setMessage("");
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
        setMessage("");
    };

    const handleBaixa = async () => {
        const productIndex = products.findIndex(
            (p) => p.sequenceIdProduct == selectedProductId
        );
        if (productIndex < 0) {
            setMessage("Selecione um produto válido.");
            return;
        }

        if (quantity <= 0) {
            setMessage("A quantidade deve ser maior que zero.");
            return;
        }

        if (quantity > products[productIndex].quantity) {
            setMessage("Quantidade excede o estoque disponível.");
            return;
        }

        const updatedProducts = [...products];
        updatedProducts[productIndex].quantity -= quantity;

        try{
            await axios.put(`http://localhost:3000/product/stock/${updatedProducts[productIndex].sequenceIdProduct}`, updatedProducts[productIndex])
        } catch(error) {
            alert("Erro ao dar baixa no produto, verifique o console para mais informações.")
            console.error(error)
            return
        }

        setProducts(updatedProducts);

        setMessage("Baixa realizada com sucesso.");
        setQuantity(0);
    };

    const selectedProduct = products.find(
        (product) => product.sequenceIdProduct == selectedProductId
    );

    return (
        <div className="baixa-produtos-container">
            <h1>Baixa de Produtos</h1>
            <div className="baixa-produtos-form">
                <label htmlFor="product-select">Produto:</label>
                <select
                    id="product-select"
                    value={selectedProductId}
                    onChange={handleProductChange}
                >
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                        <option
                            key={product.sequenceIdProduct}
                            value={product.sequenceIdProduct}
                        >
                            {product.product}
                        </option>
                    ))}
                </select>

                {selectedProduct && (
                    <div className="product-details">
                        <h3>Detalhes do Produto</h3>
                        <p><strong>Nome:</strong> {selectedProduct.product}</p>
                        <p><strong>Descrição:</strong> {selectedProduct.description}</p>
                        <p><strong>Planta:</strong> {selectedProduct.plant}</p>
                        <p><strong>Valor:</strong> R$ {selectedProduct.value.toFixed(2)}</p>
                        <p><strong>Unidade:</strong> {selectedProduct.unit}</p>
                        <p><strong>Estoque:</strong> {selectedProduct.quantity}</p>
                    </div>
                )}

                <label htmlFor="quantity-input">Quantidade:</label>
                <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                />

                <button onClick={handleBaixa}>Confirmar Baixa</button>

                {message && <p className="baixa-produtos-message">{message}</p>}
            </div>
        </div>
    );
}
