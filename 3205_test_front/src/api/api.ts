import { BASE_API_URL } from "../constants/constants";
import { Credentials } from "../models/models";

export const login = async (
  credentials: Credentials,
  signal: AbortSignal
): Promise<Response> => {
  return await fetch(`${BASE_API_URL}`, {
    signal,
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "content-type": "application/json",
    },
  });
};
