import axios, { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import type { IBlogResponse } from "~/components/admin/BlogsItemTable.vue";

export const useBlogs = () => {
  const router = useRouter();
  const tokenCookie = useCookie("token");

  const token = useState("token", () => tokenCookie.value || null);

  const create = async (data: {
    title: string;
    image: string;
    content: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/blogs",
        data,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      if (response?.status === 201) {
        toast.success(response?.data?.message);
        router.push("/admin");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "เกิดข้อผิดพลาด");
      } else {
        toast.error("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
      }
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blogs");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getBlog = async (slug: string) => {
    try {
      const response = await axios.get<IBlogResponse>(
        `http://localhost:8000/api/blogs/${slug}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeBlogs = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

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

  const update = async (
    data: {
      title: string;
      image: string;
      content: string;
    },
    id: number
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/blogs/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        router.push("/admin");
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
    create,
    getBlogs,
    getBlog,
    update,
    removeBlogs,
  };
};
