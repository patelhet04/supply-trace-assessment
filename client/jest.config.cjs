module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    importMeta: true, // Ensure importMeta is recognized in global scope
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
