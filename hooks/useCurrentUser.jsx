import { useQuery } from "@tanstack/react-query";
import { useAuthentication } from "../contexts/authContext";
import { getUser } from "../api/api";

export function useCurrentUser() {
  const { user } = useAuthentication();
  //console.log("user from ", user);
  const id = user.id;
  const { isLoading, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { isLoading, error, user: data?.user };
}
