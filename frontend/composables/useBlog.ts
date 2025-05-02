import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from 'vue-sonner'


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
      const response = await axios.post("http://localhost:8000/api/blogs", data, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      if (response?.status === 201) {
        toast.success('บันทึกข้อมูลสำเร็จ !')
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    create,
  };
};
