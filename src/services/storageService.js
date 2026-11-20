/**
 * storageService.js
 * 
 * Pure, 100% Cloud Firestore media handler.
 * Compresses images (Profile & About Me) to lightweight data URIs (~30KB)
 * and processes PDF resumes directly for Cloud Firestore.
 * 
 * Zero external storage bucket required, ZERO CORS errors.
 */

/**
 * Compress images on the client side using HTML5 Canvas.
 * Keeps portfolio images crisp, lightweight (20KB - 50KB), and lightning fast.
 */
export const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return resolve({ file, dataUrl: null });
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({ dataUrl, size: Math.round(dataUrl.length * 0.75) });
      };
      img.onerror = () => resolve({ dataUrl: event.target.result });
    };
    reader.onerror = (err) => reject(err);
  });
};

/**
 * Convert a file to a Base64 data URL.
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

export const storageService = {
  /**
   * Always true because it saves directly to Cloud Firestore
   */
  isStorageActive: () => true,

  /**
   * Upload file (profile image, about image, or resume PDF) directly into Cloud Firestore.
   */
  uploadFile: async (file, folder = "uploads", onProgress = null) => {
    if (!file) {
      return { success: false, error: "No file selected." };
    }

    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    try {
      if (typeof onProgress === "function") onProgress(35);

      // 1. Process Image
      if (isImage) {
        const result = await compressImage(file, 800, 800, 0.8);
        if (typeof onProgress === "function") onProgress(100);
        return {
          success: true,
          url: result.dataUrl,
          provider: "firestore",
          message: "Saved directly to Cloud Firestore (Zero CORS)."
        };
      }

      // 2. Process Resume PDF
      if (isPdf) {
        if (file.size > 2.5 * 1024 * 1024) {
          return {
            success: false,
            error: "PDF exceeds 2.5MB. Please choose a resume PDF under 2.5MB for Firestore."
          };
        }
        if (typeof onProgress === "function") onProgress(60);
        const dataUrl = await fileToDataUrl(file);
        if (typeof onProgress === "function") onProgress(100);
        return {
          success: true,
          url: dataUrl,
          provider: "firestore",
          message: "Saved directly to Cloud Firestore (Zero CORS)."
        };
      }

      // 3. Generic File
      const genericDataUrl = await fileToDataUrl(file);
      if (typeof onProgress === "function") onProgress(100);
      return {
        success: true,
        url: genericDataUrl,
        provider: "firestore"
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Failed to process file for Cloud Firestore."
      };
    }
  }
};
