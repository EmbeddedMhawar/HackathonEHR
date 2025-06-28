import { createHash } from "crypto";
import { readFileSync } from "fs";

/**
 * Calculate SHA-256 hash of a file (document)
 * @param filePath - path to your document file
 * @returns SHA-256 hash hex string
 */
export function sha256HashFile(filePath: string): string {
  const fileBuffer = readFileSync(filePath); // read file bytes
  const hash = createHash("sha256").update(fileBuffer).digest("hex");
  return hash;
}
