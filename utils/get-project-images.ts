import fs from "fs";
import path from "path";

const IMAGE_FILE = /\.(png|jpe?g|webp|gif|avif)$/i;
const PUBLIC_DIR = path.join(process.cwd(), "public");

const existsInPublic = (src: string) =>
  fs.existsSync(path.join(PUBLIC_DIR, ...src.split("/")));

/**
 * The images listed in the project data come first, in their listed order.
 * Any other image dropped directly into the project's folder under
 * /public/projects/<name>/ is appended, so new screenshots appear without a
 * data change. Subfolders are ignored.
 */
export function getProjectImages(listedImages: string[] = []): string[] {
  try {
    const images = listedImages.filter(existsInPublic);

    const [, root, folder] = (listedImages[0] ?? "").split("/");
    if (root === "projects" && folder) {
      const dir = path.join(PUBLIC_DIR, "projects", folder);
      if (fs.existsSync(dir)) {
        const discovered = fs
          .readdirSync(dir)
          .filter((file) => IMAGE_FILE.test(file))
          .sort((a, b) => a.localeCompare(b))
          .map((file) => `/projects/${folder}/${file}`);
        for (const image of discovered) {
          if (!images.includes(image)) images.push(image);
        }
      }
    }

    return images;
  } catch (error) {
    console.error("Error reading project images:", error);
    return listedImages;
  }
}
