import useSWR from "swr";
import {getAuth} from "../services/api";

export const useUser = () => {
  const { data, error } = useSWR('/auth', getAuth);
  if (!error && data) {
    const user = data.data;
    return {
      user,
      error,
    };
  } else {
    return {
      user: null,
      error,
    }
  }
}
