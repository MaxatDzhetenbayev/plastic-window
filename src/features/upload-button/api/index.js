import { api } from "@/shared/api";

export const uploadFileToServer = async (file, setUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,

      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadProgress(progress);
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export const useHandleUpload = (
  setUploadProgress,
  setFileName,
  setFileUrl,
  onUploadComplete
) => {
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedFileData = await uploadFileToServer(
        file,
        setUploadProgress
      );
      setFileUrl(uploadedFileData.filename);
      setFileName(uploadedFileData.filename);
      if (onUploadComplete) {
        onUploadComplete(uploadedFileData.filename);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return handleUpload;
};
