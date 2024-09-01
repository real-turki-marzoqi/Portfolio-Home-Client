import API from "../../API/api";

export const fetchPersonalInfo = async () => {
  try {
    const response = await API.get("home/personalinformations");

    return response.data;
  } catch (error) {
    console.error("Error fetching personal information:", error);
    throw error;
  }
};

export const updatePersonalInfo = async (id, data) => {
  try {
    const response = await API.put(`admin/personalinformations/${id}`, data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
    console.error("Error updating personal information:", errorMessage);
    throw new Error(errorMessage);
  }
};

