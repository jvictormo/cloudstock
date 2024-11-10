// makeData.js
export type Product = {
    id: string;
    produto: string;
    descricao: string;
    planta: string;
    valor: number;
    unidade: string;
    quantidade: number;
};

export const fakeProducts: Product[] = [
    {
        id: '1',
        produto: 'Produto A',
        descricao: 'Descrição do Produto A',
        planta: 'Planta X',
        valor: 10.5,
        unidade: 'Unidade',
        quantidade: 100,
    },
    {
        id: '2',
        produto: 'Produto B',
        descricao: 'Descrição do Produto B',
        planta: 'Planta Y',
        valor: 20.0,
        unidade: 'Kg',
        quantidade: 50,
    },
];  