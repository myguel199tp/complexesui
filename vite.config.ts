import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // crea automáticamente el export en package.json
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "ComplexesNextComponents",
      formats: ["es", "umd"], // 🔥 genera ambos formatos
      fileName: (format) =>
        `complexes-next-components${format === "es" ? ".js" : ".umd.cjs"}`,
    },
    rollupOptions: {
      // 👇 evita incluir React dentro del bundle
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
