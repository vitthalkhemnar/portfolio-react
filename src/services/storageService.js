import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseConfigured } from "./firebase";

const UPLOAD_MODE_KEY = "portfolio_upload_mode";

/**
 * Helper to compress images on the client side using HTML5 Canvas.
 * Keeps portfolio images lightweight, crisp, and fast-loading (typically 20KB - 60KB).
 */
export const compressImage = (file, maxWidth = 900, maxHeight = 900, quality = 0.82) => {
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

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now()
              });
              resolve({ file: compressedFile, dataUrl });
            } else {
              resolve({ file, dataUrl: event.target.result });
            }
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve({ file, dataUrl: event.target.result });
    };
    reader.onerror = (err) => reject(err);
  });
};

/**
 * Convert any file to a Base64 data URL.
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
   * Get current upload mode:
   * 'firestore' (default) = saves directly into Cloud Firestore (Zero CORS, instant)
   * 'storage' = uploads to Firebase Storage bucket (requires GCP CORS setup)
   */
  getUploadMode: () => {
    try {
      return localStorage.getItem(UPLOAD_MODE_KEY) || "firestore";
    } catch {
      return "firestore";
    }
  },

  /**
   * Set upload mode
   */
  setUploadMode: (mode) => {
    try {
      localStorage.setItem(UPLOAD_MODE_KEY, mode);
    } catch {}
  },

  /**
   * Check if Firebase Storage is configured with a valid bucket.
   */
  isStorageActive: () => {
    return Boolean(
      isFirebaseConfigured &&
      storage &&
      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET &&
      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET !== "your-project-id.firebasestorage.app"
    );
  },

  /**
   * Upload file (profile image, about image, or resume PDF).
   * In 'firestore' mode, encodes and compresses the file directly for Cloud Firestore.
   * In 'storage' mode, uploads to the Firebase Storage bucket (with graceful fallback on CORS error).
   */
  uploadFile: async (file, folder = "uploads", onProgress = null) => {
    if (!file) {
      return { success: false, error: "No file selected." };
    }

    const mode = storageService.getUploadMode();
    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    // 1. Direct Firestore Mode (Default, Guaranteed Zero CORS Errors)
    if (mode === "firestore") {
      try {
        if (typeof onProgress === "function") onProgress(30);

        if (isImage) {
          const compressed = await compressImage(file, 800, 800, 0.8);
          if (typeof onProgress === "function") onProgress(100);
          return {
            success: true,
            url: compressed.dataUrl,
            provider: "firestore-direct",
            message: "Stored directly in Cloud Firestore (Zero CORS)."
          };
        }

        if (isPdf) {
          if (file.size > 2.5 * 1024 * 1024) {
            return {
              success: false,
              error:
                "PDF is larger than 2.5MB. Please choose a PDF under 2.5MB for Firestore direct storage, or use an external URL link."
            };
          }
          const dataUrl = await fileToDataUrl(file);
          if (typeof onProgress === "function") onProgress(100);
          return {
            success: true,
            url: dataUrl,
            provider: "firestore-direct",
            message: "Stored directly in Cloud Firestore (Zero CORS)."
          };
        }

        const genericDataUrl = await fileToDataUrl(file);
        if (typeof onProgress === "function") onProgress(100);
        return {
          success: true,
          url: genericDataUrl,
          provider: "firestore-direct"
        };
      } catch (err) {
        return { success: false, error: err.message || "Failed to process file." };
      }
    }

    // 2. Firebase Storage Bucket Mode
    if (storageService.isStorageActive()) {
      try {
        let uploadPayload = file;
        if (isImage && file.size > 200 * 1024) {
          const compressed = await compressImage(file, 1000, 1000, 0.85);
          uploadPayload = compressed.file;
        }

        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filePath = `${folder}/${Date.now()}_${cleanName}`;
        const storageRef = ref(storage, filePath);

        const uploadTask = uploadBytesResumable(storageRef, uploadPayload, {
          contentType: uploadPayload.type || file.type
        });

        const downloadUrl = await new Promise((resolve, reject) => {
          // Add a 6-second watchdog in case CORS preflight hangs indefinitely
          const timer = setTimeout(() => {
            uploadTask.cancel();
            reject(new Error("STORAGE_CORS_TIMEOUT"));
          }, 6000);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              if (snapshot.totalBytes > 0 && typeof onProgress === "function") {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                onProgress(percent);
              }
            },
            (error) => {
              clearTimeout(timer);
              reject(error);
            },
            async () => {
              clearTimeout(timer);
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (urlErr) {
                reject(urlErr);
              }
            }
          );
        });

        if (typeof onProgress === "function") onProgress(100);
        return {
          success: true,
          url: downloadUrl,
          path: filePath,
          provider: "firebase-storage"
        };
      } catch (fbErr) {
        console.warn(
          "Firebase Storage upload encountered CORS or network error. Falling back to Cloud Firestore direct storage:",
          fbErr
        );

        // Seamlessly fallback to Firestore Direct
        try {
          if (isImage) {
            const compressed = await compressImage(file, 800, 800, 0.8);
            if (typeof onProgress === "function") onProgress(100);
            return {
              success: true,
              url: compressed.dataUrl,
              provider: "firestore-direct",
              fallback: true,
              message:
                "Firebase Storage bucket blocked CORS. Saved directly into Cloud Firestore instead!"
            };
          }
          if (isPdf && file.size <= 2.5 * 1024 * 1024) {
            const dataUrl = await fileToDataUrl(file);
            if (typeof onProgress === "function") onProgress(100);
            return {
              success: true,
              url: dataUrl,
              provider: "firestore-direct",
              fallback: true,
              message:
                "Firebase Storage bucket blocked CORS. Saved directly into Cloud Firestore instead!"
            };
          }
        } catch {
          // ignore
        }

        return {
          success: false,
          error:
            "Firebase Storage CORS blocked the upload. To fix this, switch to 'Firestore Direct' mode in the dashboard or configure CORS on your Google Cloud Storage bucket."
        };
      }
    }

    // Default fallback if storage not active
    const dataUrl = await fileToDataUrl(file);
    return { success: true, url: dataUrl, provider: "firestore-direct" };
  }
};
