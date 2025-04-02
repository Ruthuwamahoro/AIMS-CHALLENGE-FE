import toast from "react-hot-toast";

const showToast = (message: string, type: "success" | "error" = "success") => {
  toast[type](message, {
    duration: 3000,
    position: "top-right",
  });
};

export default showToast;
