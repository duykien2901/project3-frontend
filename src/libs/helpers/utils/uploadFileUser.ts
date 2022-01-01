import { notification } from "antd";
import axiosInstance from "src/services";
import { config } from "src/config";
import { API_ENDPOINTS } from "src/constants/commom.constant";
import axios from "axios";

const uploadFile = async (image: any, userId: number | undefined) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", `${config.cloud.folder}`);
  try {
    const { data: imageData }: any = await axios.post(
      `https://api.cloudinary.com/v1_1/${config.cloud.name}/image/upload`,
      formData
    );
    const { data }: any = await axiosInstance.patch(
      `${API_ENDPOINTS.USER}/${userId}`,
      {
        profileImage: imageData.url,
      }
    );
    return data.user;
  } catch (error: any) {
    notification.error({
      message: error.message,
    });
    return null;
  }
};

export default uploadFile;
