export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies["auth.token"];
  const config = useRuntimeConfig(event);

  const response = await $fetch(
    `${config.backendUrl}/api/users/${event.context.params?.id}/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: await readFormData(event),
    },
  );

  return response;
});
