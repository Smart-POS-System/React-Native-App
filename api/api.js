import { handleError } from "../helpers/error";
import axiosInstance, { formDataAxios } from "./axiosConfig";

export async function loginUser({ email, password }) {
  try {
    console.log(email);
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    if (response?.data) {
      console.log(response.data.data);
      return response.data.data.token;
    }
  } catch (error) {
    //console.log(error);
    handleError(error);
  }
}

export async function getUsers() {
  try {
    const response = await axiosInstance.get(`/users/usersForMobile`);

    if (response?.data) {
      // console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getUser(id) {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function logoutUser() {
  try {
    const response = await axiosInstance.post("/users/logout");
    if (response?.data) {
      return true;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(id) {
  try {
    console.log("rgrrdfdfg", id);
    const response = await axiosInstance.delete(`/users/${id}`);
    console.log("after delete");
    if (response?.data) {
      return true;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function activateUser(id) {
  try {
    console.log("rgrrdfdfg", id);
    const response = await axiosInstance.patch(`/users/activate/${id}`);
    console.log("after activate");
    if (response?.data) {
      return true;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function addUser(data) {
  console.log(data);
  try {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("role", data?.role);
    formData.append("phone", data?.phone);

    if (data?.image) {
      const uri = data.image;
      const fileName = `employee_${data.name}_${data.email}_${Date.now()}.jpg`;
      const type = "image/jpeg";

      formData.append("image", {
        uri: uri,
        type: type,
        name: fileName,
      });
    }
    const response = await formDataAxios.post(`/users`, formData, {
      headers: {
        Accept: "application/json",
      },
    });

    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    console.log("error", error);
    handleError(error);
  }
}

export async function updateUser(id, data) {
  try {
    console.log(data);
    const response = await axiosInstance.patch(`/users/${id}`, data);

    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function uploadImage(id, uri) {
  try {
    const formData = new FormData();
    const fileName = `employee_${id}_${Date.now()}.jpg`;
    const type = "image/jpeg";

    formData.append("image", {
      uri: uri,
      type: type,
      name: fileName,
    });

    const response = await formDataAxios.patch(
      `/users/updateImage/${id}`,
      formData,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function forgotPassword(email) {
  try {
    const response = await axiosInstance.post("/users/forgotPassword", {
      email,
    });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserPassword(data) {
  try {
    const response = await axiosInstance.patch("/users/updatePassword", {
      currentPassword: data.currentPassword,
      password: data.newPassword,
      passwordConfirm: data.confirmPassword,
    });
    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}
