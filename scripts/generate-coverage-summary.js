#!/usr/bin/env node
/**
 * Genera docs/coverage-summary.md a partir de backend/coverage/coverage-summary.json
 * (generado por Jest con --coverageReporters=json-summary).
 *
 * La salida es determinista (sin fechas ni hashes) para que solo se haga
 * commit cuando la cobertura cambie realmente.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const summaryPath = path.join(root, 'backend', 'coverage', 'coverage-summary.json');
const outDir = path.join(root, 'docs');
const outPath = path.join(outDir, 'coverage-summary.md');

if (!fs.existsSync(summaryPath)) {
  console.error(`No se encontró el resumen de cobertura: ${summaryPath}`);
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const { total, ...files } = summary;

const pct = (metric) =>
  metric && typeof metric.pct === 'number' ? `${metric.pct.toFixed(2)}%` : 'n/a';

const relative = (file) =>
  file.replace(/\\/g, '/').replace(/^.*?backend\//, '').replace(/^\.\//, '');

const rows = Object.keys(files)
  .sort((a, b) => relative(a).localeCompare(relative(b)))
  .map((file) => {
    const m = files[file];
    return `| \`${relative(file)}\` | ${pct(m.statements)} | ${pct(m.branches)} | ${pct(m.functions)} | ${pct(m.lines)} |`;
  });

const lines = [
  '# Informe de cobertura de pruebas',
  '',
  '> Archivo generado automáticamente por GitHub Actions. No editar manualmente.',
  '',
  `**Totales:** sentencias ${pct(total.statements)} · ramas ${pct(total.branches)} · funciones ${pct(total.functions)} · líneas ${pct(total.lines)}`,
  '',
  '| Archivo | Sentencias | Ramas | Funciones | Líneas |',
  '| --- | --- | --- | --- | --- |',
  ...rows,
  '',
];

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join('\n'));
console.info(`Resumen de cobertura generado en ${path.relative(root, outPath)}`);
