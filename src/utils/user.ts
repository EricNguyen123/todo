export const currentUserID = () => {
  const dataUser = localStorage.data ? JSON.parse(localStorage.data) : undefined;
  const Id = dataUser ? dataUser[0].id : undefined;
  return Id;
}
