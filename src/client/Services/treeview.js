export const getJson = async () => {
  const res = await fetch("http://localhost:3001/get-json");
  if (res.ok) {
    return await res.json();
  }
  throw new Error("Network error when fetching json");
};
