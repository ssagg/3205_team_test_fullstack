import { BASE_API_URL } from "../constants/constants";
import { Credentials } from "../models/models";

export const login = async (credentials: Credentials): Promise<Response> => {
  console.log(credentials);
  return await fetch(`${BASE_API_URL}`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "content-type": "application/json",
    },
  });
};
