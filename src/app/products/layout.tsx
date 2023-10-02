import NavBar from "@/components/NavBar/NavBar"
import { Toaster } from "@/components/shadcn/ui/toaster"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}