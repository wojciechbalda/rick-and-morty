import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Location } from "@/types";

type formSchema = Pick<Location, "name">;

export default function FilterLocationForm() {
  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm<formSchema>({
    defaultValues: {
      name: searchParams.get('name') || "",
    },
  });

  const onSubmit: SubmitHandler<formSchema> = (data) => {
    let newParams = {}
    for (const [key, value] of Object.entries(data))
      {
        if (value)
          newParams = {...newParams, [key]: value}
      }

    setSearchParams(newParams)
  };

  return (
    <Form {...form}>
      <form className="grid grid-cols-4 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="flex gap-2 self-end" type="submit">Search <Search /></Button>
      </form>
    </Form>
  );
}
