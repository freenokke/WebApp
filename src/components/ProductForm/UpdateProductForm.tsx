import { FC } from "react";
import { usePutProduct } from "@/hooks/product/CRUD";
import FormComponent from "./ProductForm";
import { ICreateProduct, IProduct } from "@/shared/api/product/types/types";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlobURL } from "@/shared/utils/createBlobURL";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
  title: z.string().min(3),
  price: z.string().nonempty(),
  description: z.string().nonempty(),
  category: z.string().nonempty(),
  image: z
    .any()
    .refine((files) => files.length ? files?.length == 1 : true, "Image is required.")
    .refine(
      (files) => files.length ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) : true,
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
});

export type ZFormSchema = z.infer<typeof FormSchema>

interface CreateProductFormProps {
  className?: string;
  data: IProduct,
  onCloseAction: (value: boolean) => void; 
}

const UpdateProductForm: FC<CreateProductFormProps> = ({ className, data, onCloseAction }) => {
  const { mutateAsync, isLoading } = usePutProduct()

  const formFields = [
      { type: 'text', label: 'Title', name: 'title' },
      { type: 'text', label: 'Price', name: 'price' },
      { type: 'text', label: 'Description', name: 'description' },
      { type: 'text', label: 'Category', name: 'category' },
      { type: 'file', label: 'Image', name: 'image' }
    ];

  const form = useForm<ZFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: data.title ?? '',
      price: data.price.toString() ?? '',
      description: data.description ?? '',
      category: data.category ?? '',
      image: {},
    }
  });

  const onSubmit = async (formData: ZFormSchema) => {
    const body: Partial<ICreateProduct> = {
      ...formData,
      price: +formData.price,
    }
    if (body.image?.length) {
      body.image = createBlobURL((formData.image as FileList)[0])
    }
    if (!body.image?.length) {
      delete body.image
    }
    await mutateAsync({
      id: data.id,
      data: body
    })
  }

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
export default UpdateProductForm