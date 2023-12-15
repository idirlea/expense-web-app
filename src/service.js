import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 

export async function get(entity) {
  try {
    const jwt = localStorage.getItem('jwt');

    const response = await axios.get(`${BASE_URL}${entity}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    
    if (response.data.data) {
      return response.data.data.map(item => ({
        id: item.id,
        ...item.attributes,
      }));
    } else if (response.data) {
      return response.data;
    }

    
  }
  catch (error) {
    console.error(error);
  }
}

export async function post(entity, data) {
  try {
    const jwt = localStorage.getItem('jwt');

    const response = await axios.post(`${BASE_URL}${entity}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  }
  catch (error) {
    console.error(error);
  }
}