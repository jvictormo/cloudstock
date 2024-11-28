import { useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_Row,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type Product = {
  id: string;
  product: string;
  description: string;
  plant: string;
  value: number;
  unit: string;
  quantity: number;
};

interface UserData {
  sequenceIdUser: number;
  email: string;
  name: string;
  companyName: string;
}


interface ProdutosComProvidersProps {
  tableData: Product[];
  userData: UserData;
}

const Produtos: React.FC<ProdutosComProvidersProps> = ({ tableData, userData }) => {
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'product',
        header: 'Produto',
        size: 100,
        minSize: 100,
        maxSize: 150,
        muiTableHeadCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 150px',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 150px',
          },
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.product,
          helperText: validationErrors?.product || '',
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              product: undefined,
            }),
        }
      },
      {
        accessorKey: 'description',
        header: 'Descrição',
        size: 200,
        minSize: 150,
        maxSize: 250,
        muiTableHeadCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 200px',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 200px',
          },
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description || '',
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        }
      },
      {
        accessorKey: 'plant',
        header: 'Planta',
        size: 80,
        minSize: 80,
        maxSize: 120,
        muiTableHeadCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 100px',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 100px',
          },
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.plant,
          helperText: validationErrors?.plant || '',
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              plant: undefined,
            }),
        }
      },
      {
        accessorKey: 'value',
        header: 'Valor',
        size: 40,
        minSize: 40,
        maxSize: 60,
        muiTableHeadCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 80px',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 80px',
          },
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.value,
          helperText: validationErrors?.value || '',
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              value: undefined,
            }),
        }
      },
      {
        accessorKey: 'unit',
        header: 'Unidade',
        size: 100,
        minSize: 80,
        maxSize: 120,
        muiTableHeadCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 100px',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 100px',
          },
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.unit,
          helperText: validationErrors?.unit || '',
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              unit: undefined,
            }),
        }
      },
      {
        accessorKey: 'quantity',
        header: 'Quantidade',
        size: 100,
        minSize: 80,
        maxSize: 120,
        muiTableHeadCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 100px',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 100px',
          },
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity || '',
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              quantity: undefined,
            }),
        }
      },
    ],
    [localProducts, validationErrors],
  );

  useEffect(() => {
    setLocalProducts(tableData)
  }, [tableData])

  const handleCreateProduct: MRT_TableOptions<Product>['onCreatingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validateProduct(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      setLocalProducts((prev) => [
        ...prev,
        { ...values, id: `product-${Date.now()}` }, // Atribuição do ID
      ]);
      table.setCreatingRow(null);
    };

  const handleSaveProduct: MRT_TableOptions<Product>['onEditingRowSave'] =
    async ({ values, table, row }) => {
      const newValidationErrors = validateProduct(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      setLocalProducts((prev) =>
        prev.map((product) =>
          product.id === row.original.id ? { ...values, id: product.id } : product
        )
      );
      table.setEditingRow(null);
    };

  const openDeleteConfirmModal = (row: MRT_Row<Product>) => {
    if (
      window.confirm(
        `Tem certeza que deseja deletar o produto "${row.original.product}"?`
      )
    ) {
      setLocalProducts((prev) =>
        prev.filter((product) => product.id !== row.original.id)
      );
    }
  };

  const handleSaveProducts = async () => {
    const updatedProducts = localProducts.map(product => ({
      ...product, 
      sequenceIdUser: userData.sequenceIdUser 
    }));

    try {
      await axios.post(`http://localhost:3000/product/bulk`, {
        products: updatedProducts,
      });
      alert('Produtos enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar produtos:', error);
      alert('Erro ao enviar produtos!');
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: localProducts,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id, // Uso do ID obrigatório
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateProduct,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveProduct,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Criar Novo Produto</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Editar Produto</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar">
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmModal(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button
          variant="contained"
          onClick={() => table.setCreatingRow(true)}
        >
          Adicionar Produto
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveProducts} // Botão para enviar tudo
        >
          Enviar para API
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

// Validação permanece a mesma
function validateRequired(value: string | number) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

function validateProduct(product: Product) {
  return {
    product: !validateRequired(product.product) ? 'Produto é obrigatório' : '',
    description: !validateRequired(product.description)
      ? 'Descrição é obrigatória'
      : '',
    plant: !validateRequired(product.plant) ? 'Planta é obrigatória' : '',
    value:
      !validateRequired(product.value) || isNaN(product.value)
        ? 'Valor deve ser um número'
        : product.value < 0
          ? 'Valor deve ser positivo'
          : '',
    unit: !validateRequired(product.unit) ? 'Unidade é obrigatória' : '',
    quantity:
      !validateRequired(product.quantity) || isNaN(product.quantity)
        ? 'Quantidade deve ser um número inteiro'
        : !Number.isInteger(Number(product.quantity))
          ? 'Quantidade deve ser um número inteiro'
          : product.quantity < 0
            ? 'Quantidade deve ser positiva'
            : '',
  };
}

const queryClient = new QueryClient();

const ProdutosComProviders: React.FC<ProdutosComProvidersProps> = ({ tableData, userData }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Produtos tableData={tableData} userData={userData}/>
    </QueryClientProvider>
  );
};

export default ProdutosComProviders;