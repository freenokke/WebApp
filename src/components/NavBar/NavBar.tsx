'use client'

import { Plus } from "lucide-react";
import ModalTrigger from "../ModalTrigger/ModalTrigger";
import CreateProductForm from "../ProductForm/CreateProductForm";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="w-full flex h-24 bg-white"
    >
      <div
        className="container flex justify-between items-center gap-3"
      >
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Product App
      </h1>
        <ModalTrigger
          triggerButtonLabel={Plus}
          dialogTitle="Add product"
          dialogDescription="Create a new product"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <CreateProductForm onCloseAction={setIsOpen} />
        </ModalTrigger>
      </div>
    </div>
  )
};

export default NavBar;