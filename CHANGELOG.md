# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-10-22

- Major migration from Create React App to Vite
- Upgraded React to 18 and migrated entry point to `createRoot`
- Migrated environment variables to Vite `import.meta.env` format
- Replaced CRA runtime and scripts with Vite scripts
- Began migration to `@chakra-ui/react` and updated component APIs
- Swapped Vite React plugin to `@vitejs/plugin-react-swc` for SWC-based fast builds
- Switched UI library to Chakra UI v2 compatible imports
- Added typed wrapper for `react-highlight-words` to maintain type-safety
- Updated layout to use responsive grid with right-hand navigation pane
- Misc: Type and build fixes after dependency upgrades

## [1.0.0] - 2021-10-17

- Initial release of Online Meeting List
