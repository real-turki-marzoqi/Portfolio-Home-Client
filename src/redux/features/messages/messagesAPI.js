import API from "../../API/api";

export const getMessages = async () => {
  try {
    const response = await API.get("admin/contact");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error: fetching Messages", error); 
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    const response = await API.delete(`admin/contact/${id}`);

    if (response.status === 200) {
      return response.data;
    }

    console.error(`Error: Unexpected response status ${response.status}`);
    throw new Error(`Unexpected response status: ${response.status}`);
    
  } catch (error) {
    console.error("Error: Deleting Message", error);
    throw new Error(`Failed to delete message with ID ${id}: ${error.message}`);
  }
};



export const addMessage = async (data) => {
  try {
    const response = await API.post('home/contact', data);

    switch (response.status) {
      case 200: // الطلب تم بنجاح ولكن هذا ليس الشائع لطلبات POST
        console.warn('Warning: Received status 200 for POST request.');
        return response.data;
      case 201: // تم إنشاء المورد بنجاح
        return response.data;
      case 400: // الطلب غير صحيح
        console.error('Error: Bad request. Please check the data sent.');
        throw new Error('Bad request: Please check the data sent.');
      case 401: // عدم وجود تصريح
        console.error('Error: Unauthorized. Please check your credentials.');
        throw new Error('Unauthorized: Please check your credentials.');
      case 500: // خطأ في الخادم
        console.error('Error: Internal server error.');
        throw new Error('Internal server error.');
      default: // حالات استجابة غير متوقعة
        console.error(`Error: Unexpected response status ${response.status}`);
        throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in addMessage function:", error);
    throw error;
  }
}
