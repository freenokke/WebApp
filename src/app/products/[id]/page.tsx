'use client'

import Loader from "@/components/Loader/Loader"
import { Card, CardTitle, CardContent } from "@/components/shadcn/ui/card"
import { toast } from "@/components/shadcn/ui/use-toast"
import WithAuth from "@/components/withAuth/withAuth"
import { useProduct } from "@/hooks/product/CRUD"
import Image from "next/image"
import { useEffect } from "react"

const SingleProduct = ({params}: { params: { id: string }}) => {
  const {data, isError, isLoading} = useProduct(+params.id)

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to fetch data",
      })
    }
  }, [isError])

  if (!data) {
    return null;
  }

  return (
    <div className="p-10">
      {(isLoading) && <Loader />}
      <Card className="flex flex-col gap-10 items-center pt-8">
        <CardTitle className="w-full text-center">
          {data.title}
        </CardTitle>
        <CardContent className="flex flex-col gap-10 w-full items-center justify-center md:flex-row md:items-start">
          <Image
            src={data.image}
            width={500}
            height={500}
            alt={data.title}
            style={{
              width: 'auto',
            }}
            className="blur md:max-w-[40%]"
            onLoadingComplete={(image) => image.classList.remove('blur')}
          />
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>
                <span className="font-bold">Description: </span>
                {data.description}</li>
              <li>
                <span className="font-bold">Category: </span>
                {data.category}
              </li>
              <li>
                <span className="font-bold">Price: </span>
                {data.price}
              </li>
            </ul>
        </CardContent>
      </Card>
    </div>
  )
}
export default WithAuth(SingleProduct)