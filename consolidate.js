/**
 * Script de consolidation du projet en un seul fichier export.md
 * Usage: node consolidate.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossiers et fichiers à exclure
const EXCLUDE_DIRS = [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.vscode',
    '.github'
];

const EXCLUDE_FILES = [
    'package-lock.json',
    'export.md',
    'consolidate.js',
    '.gitignore',
    '.DS_Store'
];

// Extensions de fichiers à inclure
const INCLUDE_EXTENSIONS = [
    '.ts',
    '.js',
    '.json',
    '.md',
    '.html',
    '.css',
    '.sh',
    '.txt',
    '.yml',
    '.yaml'
];

/**
 * Vérifie si un chemin doit être exclu
 */
function shouldExclude(filePath) {
    const parts = filePath.split(path.sep);
    return EXCLUDE_DIRS.some(dir => parts.includes(dir)) ||
           EXCLUDE_FILES.some(file => filePath.endsWith(file));
}

/**
 * Vérifie si un fichier doit être inclus selon son extension
 */
function shouldInclude(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return INCLUDE_EXTENSIONS.includes(ext);
}

/**
 * Parcourt récursivement un dossier et collecte tous les fichiers
 */
function collectFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        
        if (shouldExclude(filePath)) {
            return;
        }

        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            collectFiles(filePath, fileList);
        } else if (shouldInclude(filePath)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

/**
 * Détermine le langage pour le bloc de code markdown
 */
function getLanguage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const langMap = {
        '.ts': 'typescript',
        '.js': 'javascript',
        '.json': 'json',
        '.md': 'markdown',
        '.html': 'html',
        '.css': 'css',
        '.sh': 'bash',
        '.yml': 'yaml',
        '.yaml': 'yaml',
        '.txt': 'text'
    };
    return langMap[ext] || 'text';
}

/**
 * Génère le contenu consolidé
 */
function generateConsolidatedContent(files, rootDir) {
    let content = `# Projet MMORTS - Export Consolidé\n\n`;
    content += `> Généré le ${new Date().toLocaleString('fr-FR')}\n\n`;
    content += `## Structure du projet\n\n`;
    content += `Nombre total de fichiers : **${files.length}**\n\n`;
    content += `---\n\n`;

    // Trier les fichiers par chemin
    files.sort();

    files.forEach(filePath => {
        const relativePath = path.relative(rootDir, filePath);
        const language = getLanguage(filePath);
        
        content += `## 📄 ${relativePath}\n\n`;
        
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            content += `\`\`\`${language}\n${fileContent}\n\`\`\`\n\n`;
        } catch (error) {
            content += `\`\`\`\nErreur de lecture: ${error.message}\n\`\`\`\n\n`;
        }
        
        content += `---\n\n`;
    });

    return content;
}

/**
 * Main
 */
function main() {
    console.log('🚀 Consolidation du projet en cours...\n');
    
    const rootDir = __dirname;
    const outputPath = path.join(rootDir, 'export.md');
    
    console.log(`📁 Répertoire racine: ${rootDir}`);
    console.log(`📄 Fichier de sortie: ${outputPath}\n`);
    
    // Collecter tous les fichiers
    console.log('🔍 Collection des fichiers...');
    const files = collectFiles(rootDir);
    console.log(`✅ ${files.length} fichiers trouvés\n`);
    
    // Générer le contenu consolidé
    console.log('📝 Génération du contenu consolidé...');
    const content = generateConsolidatedContent(files, rootDir);
    
    // Écrire le fichier de sortie
    console.log('💾 Écriture du fichier export.md...');
    fs.writeFileSync(outputPath, content, 'utf-8');
    
    const sizeInMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    console.log(`\n✨ Consolidation terminée avec succès !`);
    console.log(`📊 Taille du fichier: ${sizeInMB} MB`);
    console.log(`📁 Fichier généré: ${outputPath}`);
}

// Exécution
main();
