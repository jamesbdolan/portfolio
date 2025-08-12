# Portfolio TypeScript + Bun Migration TODO

## Bun Migration
- [ ] Install Bun globally: `curl -fsSL https://bun.sh/install | bash`
- [ ] Replace package-lock.json with bun.lockb: `bun install`
- [ ] Update scripts in package.json to use `bun` instead of `npm`
- [ ] Test existing Svelte app works with Bun: `bun run dev`

## TypeScript Conversion
- [ ] Add TypeScript support to Svelte config
- [ ] Rename .js files to .ts/.tsx where appropriate
- [ ] Add type definitions for Svelte components
- [ ] Configure tsconfig.json for monorepo structure
- [ ] Add TypeScript to build pipeline

## Monorepo Structure Setup
- [ ] Create root package.json with workspaces configuration
- [ ] Move current Svelte app to `web/` subdirectory
- [ ] Set up workspace structure:
  - [ ] `web/` - Svelte + TypeScript app
  - [ ] `cv/` - LaTeX CV system (moved from ../cv/)
  - [ ] `projects/` - Project showcases and code
  - [ ] `shared/` - Common TypeScript utilities
- [ ] Update Netlify build settings to point to `web/` directory

## Integration Features
- [ ] Create TypeScript utilities in `shared/` to:
  - [ ] Parse CV markdown files
  - [ ] Generate project metadata
  - [ ] Shared type definitions
- [ ] Update portfolio site to dynamically import CV content
- [ ] Add project showcase pages that reference actual project code
- [ ] Implement cross-workspace imports for seamless integration

## Build System
- [ ] Configure Bun workspaces in root package.json
- [ ] Set up unified build scripts that handle:
  - [ ] CV LaTeX compilation
  - [ ] TypeScript compilation
  - [ ] Svelte app build
- [ ] Update deployment pipeline for monorepo structure

## Testing
- [ ] Verify all existing functionality works after migration
- [ ] Test workspace dependencies and imports
- [ ] Ensure Netlify deployment still works with new structure