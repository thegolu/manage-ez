import { useNavigate } from "react-router-dom";
import { eRoutes } from "../enum/eRoutes";

export const useService = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const get = async (url: string) => {
    const resp = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    if (resp.ok) {
      return {
        status: resp.status,
        response: data,
      };
    } else {
      if (resp.status === 401) {
        navigate(eRoutes.LOGIN);
        return {
          status: resp.status,
          response: data,
        };
      }
      throw {
        status: resp.status,
        error: data,
      };
    }
  };

  const post = async (url: string, body: any) => {
    const resp = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    if (resp.ok) {
      return {
        status: resp.status,
        response: data,
      };
    } else {
      if (resp.status === 401) {
        navigate(eRoutes.LOGIN);
        return {
          status: resp.status,
          response: data,
        };
      }
      throw {
        status: resp.status,
        error: data,
      };
    }
  };

  return { get, post };
};
