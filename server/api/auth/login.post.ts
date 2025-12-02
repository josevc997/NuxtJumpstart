export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const config = useRuntimeConfig(event);

  const response = await $fetch(`${config.backendUrl}/api/users/login/`, {
    method: "POST",
    body: await readBody(event),
  });

  return response;
});
