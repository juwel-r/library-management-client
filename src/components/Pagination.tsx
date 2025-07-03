// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { cn } from "@/lib/utils";
// import { useGetBooksQuery } from "@/redux/api/baseApi";
// import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const PaginationX = () => {
//   const [itemPerPage, setItemPerPage] = useState(6);
//   const [currentPage, setCurrentPage] = useState(0);
//   const { data } = useGetBooksQuery({limit:itemPerPage, currentPage });
//   const totalPage = Math.ceil((data?.data.length || 0) / itemPerPage);
//   const pages = [...Array(totalPage).keys()];

  

//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious
//             onClick={() =>
//               currentPage > 0 ? setCurrentPage(currentPage - 1) : ""
//             }
//           />
//         </PaginationItem>
//         <PaginationItem>
//           {pages.map((page, index) => (
//             <PaginationLink
//               key={index}
//               className={cn(currentPage === page && "selected-page")}
//               onClick={() => setCurrentPage(page)}
//             >
//               {page}
//             </PaginationLink>
//           ))}
//         </PaginationItem>

//         <PaginationItem>
//           <PaginationNext
//             onClick={() =>
//               currentPage < totalPage - 1 ? setCurrentPage(currentPage + 1) : ""
//             }
//           />
//         </PaginationItem>
//       </PaginationContent>
//         <Select
//           onValueChange={(value) => {setItemPerPage(Number(value)); setCurrentPage(0)}}
//           defaultValue="10"
//         >
//           <SelectTrigger className="w-[80px]">
//             <SelectValue placeholder="Select Book Per Page" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="2">2</SelectItem>
//             <SelectItem value="3">3</SelectItem>
//             <SelectItem value="6">6</SelectItem>
//             <SelectItem value="10">10</SelectItem>
//             <SelectItem value="15">15</SelectItem>
//           </SelectContent>
//         </Select>
//     </Pagination>
//   );
// };

// export default PaginationX;
