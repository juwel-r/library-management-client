// import Swal, { type SweetAlertIcon } from "sweetalert2";
// import "../swal.css";
// import { toast, type ToastOptions, type TypeOptions } from "react-toastify";

// //  Toastify function with types
// export const showToast = (message: string, type: TypeOptions) => {
//   const options: ToastOptions = {
//     position: "top-center",
//     autoClose: 3000,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   };

//   toast(message, options);
// };

// // SweetAlert function with typed props
// interface ShowAlertOptions {
//   title?: string;
//   text?: string;
//   icon?: SweetAlertIcon;
//   confirmButtonText?: string;
//   showCancelButton?: boolean;
// }

// export const showAlert = ({
//   title,
//   text,
//   icon = "success",
//   confirmButtonText = "OK",
//   showCancelButton,
// }: ShowAlertOptions) => {
//   return Swal.fire({
//     title: title || "Alert!",
//     text: text || "",
//     icon: icon || "info",
//     confirmButtonText,
//     showCancelButton,
//     customClass: {
//       popup: "popup",
//       title: `text-2xl font-semibold ${
//         icon === "error" ? "text-red-600" : "text-green-600"
//       }`,
//       content: "text-gray-600",
//       confirmButton:
//         icon === "error" ? "alert-button-error" : "alert-button-success",
//       cancelButton: "alert-button-error",
//     },
//   });
// };

import { toast, type TypeOptions } from "react-toastify";

// Approach: validate input, cast as TypeOptions, fallback to "default"
export const toastify = (type: string, message: string) => {
  const validTypes: TypeOptions[] = [
    "info",
    "success",
    "warning",
    "error",
    "default",
  ];

  const safeType = validTypes.includes(type as TypeOptions)
    ? (type as TypeOptions)
    : "default";

  // Call the correct method
  switch (safeType) {
    case "info":
      return toast.info(message, toastOptions);
    case "success":
      return toast.success(message, toastOptions);
    case "warning":
      return toast.warning(message, toastOptions);
    case "error":
      return toast.error(message, toastOptions);
    case "default":
    default:
      return toast(message, toastOptions);
  }
};

const toastOptions = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light" as const,
};
