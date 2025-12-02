export default defineEventHandler((event) => {
  const cookies = parseCookies(event);
  const token = cookies["auth.token"];

  return { token };
});
