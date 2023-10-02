import { FC, useCallback, useMemo } from "react";
import { usePostProduct } from "@/hooks/product/CRUD";
import FormComponent from "./ProductForm";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateProduct } from "@/shared/api/product/types/types";
import { createBlobURL } from "@/shared/utils/createBlobURL";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
  title: z.string().min(3),
  price: z.string().nonempty(),
  description: z.string().min(10),
  category: z.string().nonempty(),
  image: z
    .any()
    // .refine((files) => files?.length == 1, "Image is required.")
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   ".jpg, .jpeg, .png and .webp files are accepted."
    // )
});

export type ZFormSchema = z.infer<typeof FormSchema>

interface CreateProductFormProps {
  className?: string;
  onCloseAction: (value: boolean) => void; 
}

const CreateProductForm: FC<CreateProductFormProps> = ({ className, onCloseAction }) => {
  const { mutateAsync, isLoading } = usePostProduct()

  const formFields = useMemo(() => {
    return [
      { type: 'text', label: 'Title', name: 'title' },
      { type: 'text', label: 'Price', name: 'price' },
      { type: 'text', label: 'Description', name: 'description' },
      { type: 'text', label: 'Category', name: 'category' },
      { type: 'file', label: 'Image', name: 'image' }
    ];
  }, [])

  const form = useForm<ZFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      price: '',
      description: '',
      category: '',
      image: []
    }
  });

  const onSubmit = useCallback(async (formData: ZFormSchema) => {
    const body: ICreateProduct = {
      ...formData,
      price: +formData.price,
      image: createBlobURL((formData.image as FileList)[0])
    }
    await mutateAsync(body)
  },[mutateAsync])

  const close = () => {
    onCloseAction(false)
  }

  return (
    <FormProvider {...form}>
      <FormComponent
        className={className}
        onSubmit={onSubmit}
        isLoading={isLoading}
        formFields={formFields}
        onClose={close}
      />
    </FormProvider>
  )
}
export default CreateProductForm