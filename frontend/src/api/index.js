import axiosRoot from 'axios';
import { JWT_TOKEN_KEY } from '../contexts/auth';

const baseUrl = import.meta.env.VITE_API_URL;

const axios = axiosRoot.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export const getAll = async (url) => {
  const {data} = await axios.get(url);
  return data.items;
};

export const getById = async(url) => {
  const {data} = await axios.get(url);
  return data.items || data;
};

export const deleteById = async (url, {arg:id}) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};

export const updateById = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios.put(`${baseUrl}/${url}/${id}`, values);
};

export async function save(url, { arg: { id, ...data } }) {
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data,
  });
};

export async function post(url, {arg}) {
  const {data} = await axios.post(url, arg);
  return data;
}