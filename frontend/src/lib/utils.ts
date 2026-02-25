import { clsx, type ClassValue } from "clsx";

// Minimal replacement for `tailwind-merge`.
// We don't currently use Tailwind in this app; we just need a stable `cn()` helper.
function twMergeLite(classes: string): string {
  // Basic de-dupe to avoid repeated tokens.
  const tokens = classes.split(/\s+/).filter(Boolean);
  return Array.from(new Set(tokens)).join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMergeLite(clsx(inputs));
}
