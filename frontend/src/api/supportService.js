import api from '../axiosConfig';

export const sendContactForm = async (name, emailAddress, message) => {
    const response = await api.post(`contact-form/`, {
        name: name,
        email_address: emailAddress,
        message: message
    });
    return response.data
};

export const sendSupportForm = async (name, emailAddress, problemType, problemDescription) => {
    const response = await api.post(`technical-support/`, {
        name: name,
        email_address: emailAddress,
        problem_type: problemType,
        problem_description: problemDescription
    });
    return response.data
};