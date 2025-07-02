import type { IBookBorrowData } from "@/types";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type IProps = {
  summary: IBookBorrowData[];
};

const Chart = ({ summary }: IProps) => {
  const data = summary.map((item) => ({
    name: item.book.title,
    count: item.totalQuantity,
  }));
  console.log(data);
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="count" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
