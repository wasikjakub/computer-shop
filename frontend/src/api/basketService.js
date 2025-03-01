import api from '../axiosConfig';

export const getBasket = async () => {
    const response = await api.get('/basket/');
    return response.data;
};

export const addItemToBasket = async (productId, quantity) => {
    const response = await api.post(`basket/add_item/`, {
        product_id: productId,
        quantity,
    });
    return response.data;
};

export const removeItemFromBasket = async (itemId, quantity) => {
    const response = await api.post(`basket/remove_item/`, {
        item_id: itemId,
        quantity: quantity, // Include quantity in the request
    });
    return response.data;
};

export const clearBasket = async () => {
    const response = await api.post(`basket/clear/`);
    return response.data;
};

export const createOrder = async () => {
    const response = await api.post('create-order/');
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('orders/');
    return response.data;
};