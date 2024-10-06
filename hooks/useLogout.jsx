import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/api";
import { useAuthentication } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

function useLogout() {
  const { logOut } = useAuthentication();
  const navigation = useNavigation();
  const { isLoading, mutate: handleLogoutUser } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logOut();
      // navigation.navigate("Login");
      Toast.show({
        type: "success",
        text1: "Successfully logged out",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "An error occurred",
        text2: error.message || "Please try again",
      });
    },
  });
  return { isLoading, handleLogoutUser };
}

export default useLogout;
