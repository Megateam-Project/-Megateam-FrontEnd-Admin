// import { redirect } from "react-router-dom";
import { BASE_URL } from "./../constants/constants";
const postApi = async (url, body) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", "{{token}}");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: body,
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const putApi = async (url, body) => {
  try {
    const requestOptions = {
      method: "PUT",
      redirect: "follow",
      body: body,
    };
    console.log(url, body);
    const response = await fetch(url, requestOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getApi = async (url) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await baseRequest(url, requestOptions);
  return response;
};
const getDetailApi = async (url) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await baseRequest(url, requestOptions);
  return response;
};

const deleteApi = async (url) => {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  const response = await baseRequest(url, requestOptions);
  return response;
};

const baseRequest = async (url, requestOptions) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", "{{token}}");
    const response = await fetch(BASE_URL + url, {
      ...requestOptions,
      headers: myHeaders,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const baseApi = { postApi, putApi, getApi, getDetailApi, deleteApi };
export default baseApi;
