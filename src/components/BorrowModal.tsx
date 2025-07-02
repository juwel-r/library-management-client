import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IBook } from "@/types";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import { toastify } from "@/utils/alerts";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
interface IProps {
  book: IBook;
}
export function BorrowModal({ book }: IProps) {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const borrowData = {
      ...data,
      quantity: parseInt(data.quantity),
      book: book._id,
    };
    const res = await borrowBook(borrowData);

    if (res?.data?.success) {
      toastify("success", `${data.quantity} Books Borrowed.`);
      navigate("/borrow-summary");
    } else {
      Swal.fire({
        title: "Something went wrong!",
        // title: response.error.data.error.name,
        text: "Please try again later.",
        icon: "error",
        draggable: true,
      });
    }

    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} disabled={!book.available} className="hover:bg-[#6255E3] hover:text-white">Borrow</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Borrow "{book.title}" Book, <br />
            Available {book.copies} copies.
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <FormField
              control={form.control}
              name="quantity"
              rules={{
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Copies must be greater than 0",
                },
                max: {
                  value: book.copies,
                  message: `Maximum limit is ${book.copies} copies`,
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* dueDate */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-4 w-full">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) field.onChange(date.toISOString());
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter>
            <Button className="mt-4" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
