import Chart from "@/components/Chart";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { IBookBorrowData } from "@/types";

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const summary: IBookBorrowData[] = data?.data || [];

  if (isLoading)
    return <p className="text-center text-2xl pt-12">Loading summary...</p>;

  if (error)
    return (
      <p className="text-center text-3xl  italic text-red-300 pt-12">
        Failed to load data.
      </p>
    );

  if (!data.data.length) {
    return (
      <p className="text-center text-3xl  italic text-gray-400 pt-12">
        No Borrow Data Found.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-8 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center pt-8">
        Borrowed Books Summary
      </h2>
      <div className="flex lg:flex-row flex-col-reverse max-w-full gap-4">
        <div className="overflow-x-auto flex-1/2">
          <table className="w-full table-auto border ">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left border-r">SL</th>
                <th className="px-4 py-2 text-left border-r">Title</th>
                <th className="px-4 py-2 text-left border-r">ISBN</th>
                <th className="px-4 py-2 text-center border-r">
                  Total Quantity Borrowed
                </th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border-r">{index + 1}</td>
                  <td className="px-4 py-2 border-r">{item.book.title}</td>
                  <td className="px-4 py-2 border-r">{item.book.isbn}</td>
                  <td className="px-4 py-2 text-center border-r">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex-1/2">
          <Chart summary={summary}></Chart>
        </div>
      </div>
    </div>
  );
}
