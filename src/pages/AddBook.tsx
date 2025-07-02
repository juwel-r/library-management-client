
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IBook } from "@/types";
import { useEditBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { toastify } from "@/utils/alerts";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export function EditBookModal() {
  const [editBook] = useEditBookMutation();

  const form = useForm<IBook>();


  const handleSubmit: SubmitHandler<IBook> = async (data) => {
    const bookData = {
      ...data,
      copies: parseInt(data.copies),
      available: true,
    };

    const response = await editBook(bookData);
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
  };

  return (
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
    </form>
  );
}
