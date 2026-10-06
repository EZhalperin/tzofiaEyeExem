type Method = "GET" | "POST" | "DELETE" | "PUT";

export async function fetchUrl(
  path: string,
  method: Method,
  id?: any,
  body?: any,
) {
  let url = "http://localhost:3001";
  url += path;
  if (id) url += `/${id}`;

  const options: RequestInit = {
    method,
    credentials: "include",
  };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers = {
      "Content-Type": "application/json",
    };
  }
  const response = await fetch(url, options);
  return response.json();
}
