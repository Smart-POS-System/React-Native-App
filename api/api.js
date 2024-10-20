import { handleError } from "../helpers/error";
import axiosInstance from "./axiosConfig";

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
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getUser(id) {
  try {
    console.log("apiid", id);
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
    const response = await axiosInstance.delete(`/users/${id}`);
    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function activateUser(id) {
  try {
    const response = await axiosInstance.patch(`/users/activate/${id}`);
    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function addUser(data) {
  try {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("role", data?.role);
    formData.append("phone", data?.mobile);

    if (data?.image) {
      const file = new File(
        [data.image],
        `employee_${data.name}_${data.email}_${Date.now()}.jpg`,
        { type: "image/jpeg" }
      );
      formData.append("image", file);
    }
    const response = await axiosInstance({
      method: "post",
      url: `http://localhost:${PORT}/api/v1/users/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
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
    const response = await axiosInstance({
      method: "patch",
      url: data?.role
        ? `http://localhost:${PORT}/api/v1/users/${id}`
        : `http://localhost:${PORT}/api/v1/users/updateMe/${id}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function uploadImage(id, image) {
  try {
    const formData = new FormData();
    const file = new File([image], `employee_${id}_${Date.now()}.jpg`, {
      type: "image/jpeg",
    });
    formData.append("image", file);

    const response = await axiosInstance({
      method: "patch",
      url: `http://localhost:${PORT}/api/v1/users/updateImage/${id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (response?.data) {
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}
