export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;
  const userStr = useCookie("user").value;

  if (to.path === "/login") return;

  if (!token || !userStr) {
    return navigateTo("/login");
  }
  if (userStr && typeof userStr === "object") {
    // if (to.path.startsWith("/admin") && userStr["role"] !== "admin") {
    //   return navigateTo("/");
    // }

    if (userStr["role"] === "admin") {
      return;
    }

    if (userStr["role"] === "user") {
      if (to.path.startsWith("/admin")) {
        return navigateTo("/blogs"); 
      }
    }

    if (!["admin", "user"].includes(userStr["role"])) {
      return navigateTo("/login");
    }
  }
});
