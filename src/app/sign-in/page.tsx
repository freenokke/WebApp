'use client'

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { useToast } from "@/components/shadcn/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/shared/api/login";
import useStore from "@/store/useAuth";
import { setCookie } from "cookies-next";
import { Toaster } from "@/components/shadcn/ui/toaster";

const formFields = [
  { type: 'text', label: 'Username', name: 'username', placeholder: 'John' },
  { type: 'password', label: 'Password', name: 'password', placeholder: '**********' },
] as const;

const FormSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty()
}).required();

const SignIn = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      username: '',
    }
  });
  const { toast } = useToast()
  const { setAuth } = useStore();
  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      setAuth(true)
      setCookie('token', data.token)
      router.push('/products')
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Credentials are invalid",
      })
    },
  })

  const onSubmit = async ({ password, username }: z.infer<typeof FormSchema>) => {
    mutate({
      password,
      username
    })
  }
  
  return (
    <>
      <main className="h-[100vh] flex justify-center items-center">
        {isLoading && <Loader />}
        <div className="w-96 flex flex-col gap-8 text-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              {formFields.map(({ name, type, label, placeholder }, index) => (
                <FormField
                key={index}
                control={form.control}
                name={name}
                render={({ field }) => {
                  return (
                  <FormItem className="text-left">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}}
              />
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </main>
      <Toaster />
    </>
  )
}
export default SignIn