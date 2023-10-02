import { cn } from "@/lib/utils"
import { FC, useState } from "react";
import { Button, buttonVariants } from "../shadcn/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { IProduct } from "@/shared/api/product/types/types";
import ModalTrigger from "../ModalTrigger/ModalTrigger";
import UpdateProductForm from "../ProductForm/UpdateProductForm";
import { useDeleteProduct } from "@/hooks/product/CRUD";
import Loader from "../Loader/Loader";

interface ISideMenu {
  className?: string;
  data: IProduct;
}

const SideMenu: FC<ISideMenu> = ({ className, data }) => {
  const { mutateAsync, isLoading } = useDeleteProduct()
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <>
      {isLoading && <Loader />}
      <div
        onClick={(e) => e.preventDefault()}
        className={cn('flex flex-col', className)}
      >
        <Button onClick={() => setIsEditOpen(true)} className={`${buttonVariants({variant: "transparent"})}, p-2`}>
          <Pencil color="#2914c2" />
        </Button>
        <Button onClick={() => mutateAsync(data.id)} className={`${buttonVariants({variant: "transparent"})}, p-2`}>
          <Trash2 color="#ff0040" />
        </Button>
        <ModalTrigger
          dialogTitle="Edit product"
          dialogDescription="Edit"
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        >
          <UpdateProductForm onCloseAction={setIsEditOpen} data={data}/>
        </ModalTrigger>
      </div>
    </>
  )
}
export default SideMenu