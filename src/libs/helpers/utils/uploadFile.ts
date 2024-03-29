import { notification } from "antd";
import { config } from "src/config";
import axios from "axios";

const uploadFile = async (image: any) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", `${config.cloud.folder}`);
  try {
    const { data: imageData }: any = await axios.post(
      `https://api.cloudinary.com/v1_1/${config.cloud.name}/image/upload`,
      formData
    );

    return imageData;
  } catch (error: any) {
    notification.error({
      message: error.message,
    });
    return null;
  }
};

export default uploadFile;
