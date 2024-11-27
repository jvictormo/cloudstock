// Produtos.tsx
import { useMemo, useState } from 'react';
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
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface UserData {
  sequenceIdUser: number;
  email: string;
  name: string;
  companyName: string;
}

export type Product = {
  sequenceIdProduct: string;
  product: string;
  description: string;
  plant: string;
  value: number;
  unit: string;
  quantity: number;
  sequenceIdUser: number;
};

interface ProdutosComProvidersProps {
  userData: UserData;
}

const Produtos: React.FC<ProdutosComProvidersProps> = ({ userData }) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'sequenceIdProduct',
        header: 'ID',
        enableEditing: false,
        muiTableHeadCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 60px',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            whiteSpace: 'nowrap',
            flex: '0 0 60px',
          },
        },
      },
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
    [validationErrors],
  );

  // Hooks para CRUD
  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useCreateProduct(userData.sequenceIdUser);

  const {
    data: fetchedProducts = [],
    isError: isLoadingProductsError,
    isFetching: isFetchingProducts,
    isLoading: isLoadingProducts,
  } = useGetProducts(userData.sequenceIdUser);

  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct();
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct();

  const handleCreateProduct: MRT_TableOptions<Product>['onCreatingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validateProduct(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createProduct(values);
      table.setCreatingRow(null);
    };

  const handleSaveProduct: MRT_TableOptions<Product>['onEditingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validateProduct(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await updateProduct(values);
      table.setEditingRow(null);
    };

  const openDeleteConfirmModal = (row: MRT_Row<Product>) => {
    if (
      window.confirm(`Tem certeza que deseja deletar o produto "${row.original.product}"?`)
    ) {
      deleteProduct(parseInt(row.original.sequenceIdProduct));
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedProducts,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.sequenceIdProduct,
    muiToolbarAlertBannerProps: isLoadingProductsError
      ? {
        color: 'error',
        children: 'Erro ao carregar dados',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '275px',
      },
    },
    muiTableBodyRowProps: {
      sx: {
        height: '10px', // Altura fixa de 40px para cada linha
        '& td': {
          paddingTop: '4px',
          paddingBottom: '4px',
        },
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateProduct,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveProduct,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
      return (
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
        </>)
    },
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
      <Button
        variant="contained"
        onClick={() => table.setCreatingRow(true)}
      >
        Adicionar Produto
      </Button>
    ),
    state: {
      isLoading: isLoadingProducts,
      isSaving: isCreatingProduct || isUpdatingProduct || isDeletingProduct,
      showAlertBanner: isLoadingProductsError,
      showProgressBars: isFetchingProducts,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useCreateProduct(sequenceIdUser: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct: Product) => {
      newProduct = { ...newProduct, sequenceIdUser }
      const response = await axios.post(`http://localhost:3000/product/create`, newProduct);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}


// Hook para obter produtos
function useGetProducts(sequenceIdUser: number) {
  return useQuery<Product[]>({
    queryKey: ['products', sequenceIdUser],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/product/get/${sequenceIdUser}`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}


function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const response = await axios.put(`http://localhost:3000/product/update/${updatedProduct.sequenceIdProduct}`, updatedProduct,);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}


function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      const response = await axios.delete(`http://localhost:3000/product/delete/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}


const validateRequired = (value: string | number) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

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

const ProdutosComProviders: React.FC<ProdutosComProvidersProps> = ({ userData }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Produtos userData={userData} />
    </QueryClientProvider>
  );
};


export default ProdutosComProviders;