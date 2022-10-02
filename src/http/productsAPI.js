import { $host } from './index';

// АДМИН
export const getPermisson = async (password) => {
  const { data } = await $host.post(`api/admin`, password);
  return data;
};
// ПРОДУКТЫ
export const createProduct = async (product) => {
  const { data } = await $host.post('api/product', product);
  return data;
};

export const fetchProducts = async () => {
  const { data } = await $host.get('api/product');
  return data;
};

export const deleteProduct = async (product) => {
  const { data } = await $host.delete(`api/product/${product}`);
  return data;
};

export const putProduct = async (id, product) => {
  const { data } = await $host.put(`api/product/${id}`, product);
  return data;
};

// КАТЕГОРИИ
export const createCategory = async (category) => {
  const { data } = await $host.post('api/categories', category);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await $host.get('api/categories');
  return data;
};
export const fetchCategoriesList = async () => {
  const { data } = await $host.get('api/categories/list');
  return data;
};

export const deleteCategory = async (category) => {
  const { data } = await $host.delete('api/categories', category);
  return data;
};
export const putCategory = async (id, category) => {
  const { data } = await $host.put(`api/categories/${id}`, category);
  return data;
};
// СТИЛИ
export const createStyle = async (style) => {
  const { data } = await $host.post('api/styles', style);
  return data;
};

export const fetchStyle = async () => {
  const { data } = await $host.get('api/styles');
  return data;
};

export const deleteStyle = async (style) => {
  const { data } = await $host.delete('api/styles', style);
  return data;
};

export const putStyle = async (id, style) => {
  const { data } = await $host.put(`api/styles/${id}`, style);
  return data;
};
