import "@testing-library/jest-dom";

// Mocking import.meta.env
globalThis.importMeta = { env: { VITE_API_URL: "http://localhost:5001" } };
