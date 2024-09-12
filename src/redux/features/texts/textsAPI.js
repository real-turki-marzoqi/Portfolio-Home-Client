import API from "../../API/api";

export const fetchTexts = async () => {
  try {
    const response = await API.get("/api/v1/texts");

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error: fetching Texts", error); 
    throw error;
  }
};

export const UpdateTexts = async (id, data) => {
  if (!id || !data) {
    console.error("Error: ID and data must be provided.");
    throw new Error("ID and data must be provided.");
  }

  try {
    const response = await API.put(`/api/v1/texts/${id}`, data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error: Updating Texts", error);
    throw error;
  }
};
