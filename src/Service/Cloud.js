import axios from "axios";

// dito naman yung coconect sya sa server tapos gagawa action query
export const saveImageToCloud = async (image) => {
  if (!image) return;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "isrscr1n");

  return axios
    .post(`https://api.cloudinary.com/v1_1/ddr0lfrjj/image/upload`, formData)
    .then(({ status, data }) => {
      if (status === 200 && data) {
        const { secure_url } = data || {};
        return secure_url;
      }
    })
    .catch((error) => error);
};
