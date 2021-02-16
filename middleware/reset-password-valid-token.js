export default async function({ query, redirect }) {
  if (!(query.token && query.token.length > 3)) {
    redirect("/");
  }
}
