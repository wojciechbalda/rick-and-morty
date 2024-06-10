import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Character } from "@/types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type formSchema = Pick<Character, "name" | "status" | "gender">;

export default function FilterCharactersForm() {
  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm<formSchema>({
    defaultValues: {
      gender: searchParams.get('gender') as Character['gender'] || undefined,
      name: searchParams.get('name') || "",
      status: searchParams.get('status') as Character['status'] || undefined,
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
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="genderless">Genderless</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="alive">Alive</SelectItem>
                  <SelectItem value="dead">Dead</SelectItem>
                  <SelectItem value="a">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button className="flex gap-2 self-end" type="submit">Search <Search /></Button>
      </form>
    </Form>
  );
}
