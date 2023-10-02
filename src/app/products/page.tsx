'use client'

import CardComponent from "@/components/Card/Card"
import Loader from "@/components/Loader/Loader"
import NavBar from "@/components/NavBar/NavBar"

import { toast } from "@/components/shadcn/ui/use-toast"
import WithAuth from "@/components/withAuth/withAuth"
import { useProducts } from "@/hooks/product/CRUD"
import { ApiEndpoints } from "@/shared/configs/apiConfig"
import Link from "next/link"
import { useEffect } from "react"

const CardContainer = () => {
  const {data, isError, isLoading} = useProducts({
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to fetch data",
      })
    }
  }, [isError])

  return (
    <>
      <NavBar />
      <main className="container flex justify-center items-stretch gap-5 flex-wrap py-10">
        {isLoading && <Loader />}
        {data && data.map((product) => (
          <Link className="w-[300px] block hover:scale-[102%] transition-all overflow-x-hidden" href={`/${ApiEndpoints.PRODUCT}/${product.id}`} key={product.id}>
            <CardComponent product={product} />
          </Link>
        ))}
      </main>
    </>
  )
}
export default WithAuth(CardContainer)