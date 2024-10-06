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

export async function getUsers(pageNumber, itemsPerPage, name = "", role = "") {
  console.log(pageNumber, itemsPerPage, name, role);

  try {
    const queryParams = new URLSearchParams({
      page: pageNumber,
      limit: itemsPerPage,
      ...(name && { name }),
      ...(role && { role }),
    }).toString();

    const response = await axiosInstance.get(`/users?${queryParams}`);

    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getUser(id) {
  try {
    console.log("id", id);
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
