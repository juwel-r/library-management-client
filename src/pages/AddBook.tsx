import { useForm, type SubmitHandler } from "react-hook-form";
import { genre, type IBook } from "@/types";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import bookAnimation from "../assets/books-animation.json";
import { toastify } from "@/utils/alerts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function AddBook() {
  const [createBook] = useCreateBookMutation();
  const form = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      genre: "",
      copies: 0,
      description: "",
      available: false,
    },
  });

  const handleSubmit: SubmitHandler<IBook> = async (data) => {
    const bookData = {
      ...data,
      copies: Number(data.copies),
    };
    console.log(bookData);
    const response = await createBook(bookData);
    if (response?.data?.success) {
      toastify("success", "New book added!");
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
  };


  return (
    <div className="grid md:grid-cols-2 gap-x-12 w-full px-5 pt-8">
      <h1 className="text-2xl sm:text-3xl font-bold sm:col-span-2 mx-auto sm:mb-4">
        Add New Book
      </h1>
      <div className="my-auto mt-0">
        <Lottie animationData={bookAnimation} />
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 my-auto"
      >
        <p className="font-bold">
          To add new book, please enter book's details.
        </p>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required!" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value} />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Author and ISBN */}
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author name is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
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
                    <Input {...field} value={field.value} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Genre and copies */}
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Genre is required!" }}
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
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
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2">
              {/* copies */}
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Copies is required",
                  min: {
                    value: 1,
                    message: "Copies must be positive number.",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* checkbox */}
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-auto">Available</FormLabel>
                    <FormControl>
                      <Checkbox
                        className="h-9 w-9 rounded-md ml-auto mr-3"
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

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
                  <p className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        </Form>
        <Button className="w-full ml-auto bg-[#6255E3]">Add Book</Button>
      </form>
    </div>
  );
}
export default AddBook;
