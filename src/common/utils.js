export const arrayFireStoreToMap = (arrayData = []) => {
  const newMap = {};
  arrayData.forEach((element) => {
    newMap[`${element.id}`] = {
      id: element.id,
      ...element.data(),
    };
  });

  return newMap;
};

export const imgFileUpload = async (imgFile) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/bartolome90/upload";
  const formData = new FormData();

  formData.append("file", imgFile);
  formData.append("upload_preset", "images-journal");

  try {
    const resp = await fetch(cloudUrl, { method: "POST", body: formData });

    if (resp.ok) {
      const cloudResponse = await resp.json();
      return cloudResponse.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw await error;
  }
};
