export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies["auth.token"];
  const config = useRuntimeConfig(event);

  const response = await $fetch(`${config.backendUrl}/api/users/logout/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
});
