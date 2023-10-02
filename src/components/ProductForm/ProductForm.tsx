import { FieldValues, useFormContext } from "react-hook-form";
import { FormField, Form, FormControl, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface FormProps<T> {
  className?: string;
  isLoading?: boolean;
  onSubmit: (data: T) => void;
  onClose: () => void;
  formFields: readonly {name: string, type: string, label: string}[];
}


const FormComponent = <T extends FieldValues>(props: FormProps<T>) => {
  const { className, onSubmit, formFields, onClose, isLoading } = props;
  const formContext = useFormContext<T>()

  useEffect(() => {
    if (formContext.formState.isSubmitSuccessful) {
      onClose()
    }
  }, [formContext.formState.isSubmitSuccessful, onClose])

  const onSubmitHandler = (e: React.MouseEvent) => {
    formContext.handleSubmit(onSubmit)(e)
  }

  return (
    <Form {...formContext}>
      <form
        className={cn("w-full h-full p-1 overflow-y-auto flex flex-col gap-3", className)}
      >
        {formFields.map(({ name, type, label }, index) => (
          <FormField
            key={index}
            name={name}
            render={({ field }) => {
              return (
                <FormItem className="text-left">
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    {type === 'file' ? (
                      <Input
                      type={type}
                      onChange={(e) => field.onChange(e.target.files)}
                      name={field.name}
                      disabled={false}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                    
                    ) : (
                      <Input
                      type={type}
                      {...field}
                    />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ))}
        <Button disabled={isLoading} onClick={onSubmitHandler} type="button">Submit</Button>
      </form>
    </Form>
  );
};
export default FormComponent;
