import ProdutosComProviders from "./ProductTable"

interface UserData {
    sequenceIdUser: number;
    email: string;
    name: string;
    companyName: string;
}

interface ProdutosProps {
    userData: UserData;
}


function Produtos({ userData }: ProdutosProps) {
    return (
        <div>
            <h1>Gestão de Produtos</h1>
            <ProdutosComProviders userData={userData} />
        </div>
    )
}

export default Produtos