const API_URL = '/api';

// Genel API istekleri için yardımcı fonksiyonlar
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API isteği sırasında hata oluştu:', error);
    throw error;
  }
};

export const postData = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API isteği sırasında hata oluştu:', error);
    throw error;
  }
};

export const updateData = async (endpoint, id, body) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API isteği sırasında hata oluştu:', error);
    throw error;
  }
};

export const deleteData = async (endpoint, id) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API isteği sırasında hata oluştu:', error);
    throw error;
  }
};