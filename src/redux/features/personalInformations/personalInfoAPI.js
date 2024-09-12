import API from "../../API/api";

export const fetchPersonalInfo = async () => {
  try {
    const response = await API.get("/api/v1/personalInfo");

    return response.data;
  } catch (error) {
    console.error("Error fetching personal information:", error);
    throw error;
  }
};
export const updatePersonalInfo = async (id, data) => {
  if (!id || !data) {
    console.error("Error: ID and data must be provided.");
    throw new Error("ID and data must be provided.");
  }

  try {
    const response = await API.put(`/api/v1/personalInfo/${id}`, data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
    console.error("Error: Updating Personal Information", errorMessage);
    throw new Error(errorMessage);
  }
};



