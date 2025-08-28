const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const scriptsDir = path.join(__dirname, 'scripts');
const outDir = path.join(__dirname, 'dist');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

esbuild
  .build({
    entryPoints: [path.join(scriptsDir, 'main.js')],
    bundle: true,
    outfile: path.join(outDir, 'bundle.js'),
    loader: {
      '.otf': 'file',
      '.svg': 'file',
    },
  })
  .catch(() => process.exit(1));
