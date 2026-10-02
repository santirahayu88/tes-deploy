const nextJest = require("next/jest")();

const createJestConfig = nextJest;

const customJestConfig = {
  testEnvironment: "node",
  // === [TAMBAHAN BARU: Memetakan alias @/ ke folder root] ===
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);