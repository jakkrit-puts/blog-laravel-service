import axios, { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

export const useAuth = () => {
  const router = useRouter();
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBaseUrl;

  const tokenCookie = useCookie("token");
  const userCookie = useCookie("user");

  const token = useState("token", () => tokenCookie.value || null);
  const user = useState("user", () => {
    try {
      return userCookie.value ? userCookie.value : null;
    } catch {
      return null;
    }
  });

  const login = async (form: { email: string; password: string }) => {
    try {
      const { data, status } = await axios.post(`${apiBase}/login`, form);

      token.value = data?.access_token;
      user.value = data?.user;

      useCookie("token").value = data?.access_token;
      useCookie("user").value = JSON.stringify(data?.user);

      console.log({ status });

      if (status === 200) {
        router.push("/admin");
        // toast.success("เข้าสู่ระบบสำเร็จ ...");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "เกิดข้อผิดพลาด");
      } else {
        toast.error("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${apiBase}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      token.value = null;
      user.value = null;
      useCookie("token").value = null;
      useCookie("user").value = null;

      router.push("/login");
    } catch (err) {
      console.error("error:", err);
    }
  };

  const register = async (form: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await axios.post(`${apiBase}/register`, form);

      if (response?.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "เกิดข้อผิดพลาด");
      } else {
        toast.error("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
      }
    }
  };

  return {
    user,
    token,
    login,
    logout,
    register,
  };
};
