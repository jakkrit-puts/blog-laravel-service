import axios from "axios";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const router = useRouter();
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
      const { data } = await axios.post(
        "http://localhost:8000/api/login",
        form
      );

      token.value = data?.access_token;
      user.value = data?.user;

      useCookie("token").value = data?.access_token;
      useCookie("user").value = JSON.stringify(data?.user);

      router.push("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
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

  return {
    user,
    token,
    login,
    logout,
  };
};
