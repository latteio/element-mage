# element-mage
Based on Vu3 ElementPlus TSX component encapsulationGoal: 
Refined, concise, close to native; keep encapsulation unchanged, allow easy extension, try not to change user habits.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### Component packaging command (pack the component into tgz format)
```sh
npm run build
npm pack
```

### Component packaging configuration

Configuration in package.json: 
```json
"main": "dist/index.umd.js",
"module": "dist/index.es.js",
"style": "dist/index.css",
"types": "dist/types/index.d.ts",
"files": [
  "dist"
],
"exports": {
    ".": {
    "style": "./dist/index.css",
    "import": "./dist/index.es.js",
    "require": "./dist/index.umd.js"
    }
}
```

Configuration in vite.config.ts: 
```javascript
build: {
    outDir: 'dist',
    lib: {
        entry: path.resolve(__dirname, 'src/element-mage.ts'),
        name: 'element-mage',
        formats: ['es', 'umd'],
        fileName: (format) => `dist/index.${format}.js`
    },
    rollupOptions: {
          external: ['vue'], 
          output: {
              globals: {
                vue: 'Vue',
              },
          entryFileNames: 'dist/index.es.js', 
          assetFileNames: 'dist/index.css'
    }
  },
  sourcemap: false,
  emptyOutDir: true
}
```
