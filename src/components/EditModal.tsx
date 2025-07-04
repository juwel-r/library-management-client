import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { genre, type IBook } from "@/types";
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEditBookMutation, useGetBookByIdQuery } from "@/redux/api/baseApi";
import { Textarea } from "./ui/textarea";
import Swal from "sweetalert2";
import { toastify } from "@/utils/alerts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface EditProps {
  id: string;
}

export function EditBookModal({ id }: EditProps) {
  const { data, refetch } = useGetBookByIdQuery(id);
  const [open, setOpen] = useState(false);
  const [editBook] = useEditBookMutation();
  const form = useForm<IBook>();

  console.log(data);

  useEffect(() => {
    if (open && data?.data) {
      form.reset({
        title: data.data.title,
        author: data.data.author,
        genre: data.data.genre,
        isbn: data.data.isbn,
        copies: data.data.copies,
        description: data.data.description,
      });
    }
  }, [open, data, form]);

  const handleSubmit: SubmitHandler<IBook> = async (data) => {
    const bookData = {
      ...data,
      copies: Number(data.copies),
      available: data.copies > 0,
    };

    const response = await editBook({ id, bookData });
    if (response?.data?.success) {
      toastify("success", "Save Changes Successful!");
      refetch();
    } else {
      Swal.fire({
        title: "Something went wrong!",
        text: "Please try again later.",
        icon: "error",
        draggable: true,
      });
    }

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="hover:bg-[#6255E3] hover:text-white"
          variant={"outline"}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book Info</DialogTitle>
          <DialogDescription>
            Update book details and click Save Changes.
          </DialogDescription>
        </DialogHeader>
        <div className="border"></div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 ">
          <Form {...form}>
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author name is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Genre is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genre.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              rules={{ required: "ISBN number is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>ISBN Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              rules={{
                required: "Copies is required",
                min: {
                  value: 0,
                  message: "Copies must be 0 or positive number.",
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter className="pt-4">
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/*
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { genre, type IBook } from "@/types";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEditBookMutation } from "@/redux/api/baseApi";
import { Textarea } from "./ui/textarea";
import Swal from "sweetalert2";
import { toastify } from "@/utils/alerts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface IProps {
  book: IBook;
}

export function EditBookModal({ book }: IProps) {
  const [open, setOpen] = useState(false);
  const [editBook] = useEditBookMutation();

  const form = useForm<IBook>({
    defaultValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      copies: book.copies,
      description: book.description,
    },
  });
  const id = book._id;

  const handleSubmit: SubmitHandler<IBook> = async (data) => {
    const bookData = {
      ...data,
      copies: Number(data.copies),
      available: data.copies > 0,
    };

    const response = await editBook({ id, bookData });
    if (response?.data?.success) {
      toastify("success", "Save Changes Successful!");
    } else {
      Swal.fire({
        title: "Something went wrong!",
        // title: response.error.data.error.name,
        text: "Please try again later.",
        icon: "error",
        draggable: true,
      });
    }

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="hover:bg-[#6255E3] hover:text-white"
          variant={"outline"}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book Info</DialogTitle>
          <DialogDescription>
            Update book details and click Save Changes.
          </DialogDescription>
        </DialogHeader>
        <div className="border"></div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 ">
          <Form {...form}>
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author name is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Genre is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genre.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              rules={{ required: "ISBN number is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>ISBN Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              rules={{
                required: "Copies is required",
                min: {
                  value: 0,
                  message: "Copies must be 0 or positive number.",
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter className="pt-4">
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
*/
