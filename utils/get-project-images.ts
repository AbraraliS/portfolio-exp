import fs from "fs";
import path from "path";

export function getProjectImages(
  projectId: string,
  fallbackImages: string[] = [],
): string[] {
  try {
    // Try to extract the actual folder name from the first fallback image
    // e.g., "/projects/texora/Home-page.png" -> "texora"
    let folderName = projectId;
    if (fallbackImages.length > 0) {
      const parts = fallbackImages[0].split("/");
      if (parts.length >= 3 && parts[1] === "projects") {
        folderName = parts[2];
      }
    }

    const dirPath = path.join(process.cwd(), "public", "projects", folderName);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      const images = files
        .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => `/projects/${folderName}/${file}`);

      if (images.length > 0) {
        return images;
      }
    }
  } catch (error) {
    console.error(`Error reading images for project ${projectId}:`, error);
  }
  return fallbackImages;
}
