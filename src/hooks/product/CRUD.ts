import { UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "@/shared/api/product";
import { ICreateProduct, IProduct } from "@/shared/api/product/types/types";
import { AxiosError } from "axios";
import { toast } from "@/components/shadcn/ui/use-toast";


export function useProducts(options?: UseQueryOptions<IProduct[], AxiosError>) {
  return useQuery<IProduct[], AxiosError>({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts(signal),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message
      })
    },
    ...options
  })
}

export function useProduct(id: IProduct['id'], options?: UseQueryOptions<IProduct | undefined, Error>) {
  const queryClient = useQueryClient();
  return useQuery<IProduct | undefined, Error>({
    queryKey: ['products', id],
    queryFn: async () => {
    const data = queryClient.getQueryData<IProduct[]>(['products'])
      const item = data?.find((item) => item.id === id)
      if (!item) {
        throw new Error('Product has not been found')
      }
      return item
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message
      })
    },
    ...options
  })
}

export function usePostProduct() {
  const queryClient = useQueryClient();
  return useMutation<IProduct, AxiosError, Partial<ICreateProduct>>({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.setQueryData<IProduct[]>(['products'], (oldData) => {
        const maxId = Math.max(...oldData?.map((product) => product.id) ?? [])
        data.id = maxId + 1
        return oldData ? [...oldData, data] : [data]
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to create product"
      })
    }
  })
}

export function usePutProduct() {
  const queryClient = useQueryClient();
  return useMutation<IProduct[], AxiosError, {id: number, data: Partial<ICreateProduct>}>({
    mutationFn: async ({id, data}) => {
      const oldData = queryClient.getQueryData<IProduct[]>(['products'])
      const index = oldData?.findIndex((item) => item.id === id)
        if (index && oldData) {
          const updatedElement: IProduct = {
            ...oldData[index],
            ...data
          };
          const newData = oldData!.toSpliced(index, 1, updatedElement)
          // delay imitation
          return new Promise((res) => {
            setTimeout(() => {
              res(newData)
            }, 700)
          })
        }
        return oldData ?? []
    },
    onSuccess: (data) => queryClient.setQueryData(['products'], data),
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to create product"
      })
    }
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation<IProduct[], AxiosError, number>({
    mutationFn: async (id) => {
      const data = queryClient.getQueryData<IProduct[]>(['products'])
      const newData = data?.filter((item) => item.id !== id) ?? []
      // delay imitation
      return new Promise((res) => {
        setTimeout(() => {
          res(newData)
        }, 700)
      })
    },
    onSuccess: (data) => queryClient.setQueryData(['products'], data),
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to delete product"
      })
    }
  })
}