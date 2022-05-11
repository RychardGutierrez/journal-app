import cloudinary from "cloudinary";
import { imgFileUpload } from "./utils";

const setupCloudinary = cloudinary.config({
  cloud_name: "bartolome90",
  api_key: "416714315721661",
  api_secret: "9O_kmsomgFoAr28QMq4sHDHfK-M",
  secure: true,
});

describe("imgFileUpload", () => {
  it("should upload and return URL", async () => {
    const imgUrlTest =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qGrIXUi4WWHI6nSWn0AXcQr_zRMncPQQgw&usqp=CAU";
    const img = await fetch(imgUrlTest);
    const blob = await img.blob();
    const file = new File([blob], "duck.jpeg");
    const url = await imgFileUpload(file);
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    expect(typeof url).toBe("string");

    const { result } = await cloudinary.v2.uploader.destroy(imageId, {});
    expect(result).toBe("ok");
  });

  it("should error message", async () => {
    const file = new File([], "duck.jpeg");

    await expect(imgFileUpload(file)).rejects.toEqual({
      error: { message: "Empty file" },
    });
  });
});
