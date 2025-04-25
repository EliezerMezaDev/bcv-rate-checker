import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [tailwindcss()],
});
