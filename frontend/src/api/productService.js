import api from '../axiosConfig';

export const getProducts = async (categoryId, minPrice, maxPrice, producer, availability, name, pageNumber) => {
  try {
    // Create query parameters dynamically
    let queryParams = '';
    
    if (categoryId) queryParams += `category=${categoryId}&`;
    if (minPrice) queryParams += `min_price=${minPrice}&`;
    if (maxPrice) queryParams += `max_price=${maxPrice}&`;
    if (producer) queryParams += `producer=${producer}&`;
    if (availability) queryParams += `availability=${availability}&`;
    if (name) queryParams += `name=${encodeURIComponent(name)}&`;
    if (pageNumber) queryParams += `page=${pageNumber}&`

    // Remove the last '&' if it exists
    if (queryParams.endsWith('&')) {
      queryParams = queryParams.slice(0, -1);
    }

    const response = await api.get(`/products/?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

