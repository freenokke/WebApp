import { Card, CardContent, CardDescription, CardTitle } from "@/components/shadcn/ui/card"
import Image from 'next/image'
import SideMenu from "@/components/SideMenu/SideMenu";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, PropsWithoutRef } from "react";
import { IProduct } from "@/shared/api/product/types/types";

interface ICardComponent extends HTMLAttributes<HTMLDivElement> {
  product: IProduct
}

const CardComponent: FC<PropsWithoutRef<ICardComponent>> = ({ product, className, ...other }) => {
  const { image, price, title } = product;
  return (
    <Card
      className={cn("w-full h-full relative group", className)}
      {...other}
    >
      <CardContent className="flex flex-col gap-5 pt-3">
        <Image
          src={image}
          alt={title}
          width={250}
          height={250}
          className="blur"
          onLoadingComplete={(image) => image.classList.remove("blur")}
          style={{
            width: "250px",
            aspectRatio: "1 / 1",
            objectFit: "contain",
          }}
        />
        <CardTitle className="max-w-full">{title}</CardTitle>
        <CardDescription>Price: {price}$</CardDescription>
      </CardContent>
      <SideMenu
        data={product}
        className="absolute top-0 -right-9 w-8 h-10 transition-all delay-150 group-hover:right-0"
      />
    </Card>
  );
};
export default CardComponent;
