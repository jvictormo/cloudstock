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
import { Product, fakeProducts } from './makeData'; // Importe os dados falsos

const Produtos = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 20, // Largura fixa
        minSize: 20,
        maxSize: 50,
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
        accessorKey: 'produto',
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
      },
      {
        accessorKey: 'descricao',
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
      },
      {
        accessorKey: 'planta',
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
      },
      {
        accessorKey: 'valor',
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
      },
      {
        accessorKey: 'unidade',
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
      },
      {
        accessorKey: 'quantidade',
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
      },
    ],
    [validationErrors],
  );

  // Hooks para CRUD
  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useCreateProduct();
  const {
    data: fetchedProducts = [],
    isError: isLoadingProductsError,
    isFetching: isFetchingProducts,
    isLoading: isLoadingProducts,
  } = useGetProducts();
  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct();
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct();

  // Ações de CRUD
  const handleCreateProduct: MRT_TableOptions<Product>['onCreatingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = validateProduct(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createProduct(values);
      table.setCreatingRow(null); // Sair do modo criação
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
      table.setEditingRow(null); // Sair do modo edição
    };

  const openDeleteConfirmModal = (row: MRT_Row<Product>) => {
    if (
      window.confirm(`Tem certeza que deseja deletar o produto "${row.original.produto}"?`)
    ) {
      deleteProduct(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedProducts,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingProductsError
      ? {
        color: 'error',
        children: 'Erro ao carregar dados',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '200px',
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

// Hooks de CRUD utilizando React Query

// Hook para criar um produto
function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // Simulação de chamada API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return Promise.resolve();
    },
    onMutate: (newProduct: Product) => {
      queryClient.setQueryData(['products'], (prevProducts: Product[] = []) => [
        ...prevProducts,
        { ...newProduct, id: (Math.random() + 1).toString(36).substring(7) },
      ]);
    },
  });
}

// Hook para obter produtos
function useGetProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      // Simulação de chamada API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return Promise.resolve(fakeProducts);
    },
    refetchOnWindowFocus: false,
  });
}

// Hook para atualizar um produto
function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // Simulação de chamada API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return Promise.resolve();
    },
    onMutate: (updatedProduct: Product) => {
      queryClient.setQueryData(['products'], (prevProducts: Product[] = []) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      );
    },
  });
}

// Hook para deletar um produto
function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // Simulação de chamada API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return Promise.resolve();
    },
    onMutate: (productId: string) => {
      queryClient.setQueryData(['products'], (prevProducts: Product[] = []) =>
        prevProducts.filter((product) => product.id !== productId),
      );
    },
  });
}

// Validações dos campos do produto
const validateRequired = (value: string | number) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

function validateProduct(product: Product) {
  return {
    produto: !validateRequired(product.produto) ? 'Produto é obrigatório' : '',
    descricao: !validateRequired(product.descricao)
      ? 'Descrição é obrigatória'
      : '',
    planta: !validateRequired(product.planta) ? 'Planta é obrigatória' : '',
    valor:
      !validateRequired(product.valor) || product.valor < 0
        ? 'Valor deve ser um número positivo'
        : '',
    unidade: !validateRequired(product.unidade) ? 'Unidade é obrigatória' : '',
    quantidade:
      !validateRequired(product.quantidade) || product.quantidade < 0
        ? 'Quantidade deve ser um número positivo'
        : '',
  };
}

// Configuração do React Query
const queryClient = new QueryClient();

const ProdutosComProviders = () => (
  <QueryClientProvider client={queryClient}>
    <Produtos />
  </QueryClientProvider>
);

export default ProdutosComProviders;