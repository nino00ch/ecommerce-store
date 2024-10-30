import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

//callback fct
export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  //sign Up fct
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
