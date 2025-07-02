import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

interface BorrowedBook {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) return <p className="text-center">Loading summary...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load data.</p>;

  const summary: BorrowedBook[] = data?.data || [];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Borrowed Books Summary</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">ISBN</th>
              <th className="px-4 py-2 text-left">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.book.title}</td>
                <td className="px-4 py-2">{item.book.isbn}</td>
                <td className="px-4 py-2">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
