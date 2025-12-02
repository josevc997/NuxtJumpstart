export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies["auth.token"];
  const config = useRuntimeConfig(event);

  const response = await $fetch(`${config.backendUrl}/api/users/group/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: await readBody(event),
  });

  return response;
});
