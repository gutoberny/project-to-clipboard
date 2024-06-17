const fs = require("fs");
const path = require("path");
const ignore = require("ignore");
const clipboardy = require("clipboardy");

const ig = ignore();
const gitignorePath = path.join(process.cwd(), ".gitignore");
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
  ig.add(gitignoreContent.split("\n").map((line) => line.trim()));
}

ig.add([
  "package-lock.json",
  ".gitignore",
  "node_modules",
  "yarn.lock",
  "README.md",
  ".git",
]);

const extensionToLanguageMap = {
  ".js": "javascript",
  ".mjs": "javascript",
  ".cjs": "javascript",
  ".ts": "typescript",
  ".tsx": "typescript",
  ".jsx": "javascript",
  ".html": "html",
  ".htm": "html",
  ".css": "css",
  ".scss": "scss",
  ".sass": "sass",
  ".less": "less",
  ".json": "json",
  ".json5": "json5",
  ".tf": "hcl",
  ".tfvars": "hcl",
  ".dockerfile": "docker",
  Dockerfile: "docker",
  ".sh": "bash",
  ".py": "python",
  ".java": "java",
  ".groovy": "groovy",
  ".md": "markdown",
  ".yaml": "yaml",
  ".yml": "yaml",
  ".xml": "xml",
  ".rb": "ruby",
  ".php": "php",
  ".pl": "perl",
  ".pm": "perl",
};

function createDirectoryTree(dirPath, indent = "", parentPath = "") {
  let tree = "";
  const filesAndDirs = fs.readdirSync(dirPath);

  filesAndDirs.forEach((fileOrDir, index) => {
    const fullPath = path.join(dirPath, fileOrDir);
    const relativePath = path.join(parentPath, fileOrDir);

    if (ig.ignores(relativePath)) {
      return;
    }

    const isDir = fs.statSync(fullPath).isDirectory();
    const isLast = index === filesAndDirs.length - 1;
    const prefix = isLast ? "└──" : "├──";

    if (isDir) {
      tree += `${indent}${prefix} ${relativePath}\n`;
      const newIndent = indent + (isLast ? " " : "│ ");
      tree += createDirectoryTree(fullPath, newIndent, relativePath);
    } else {
      tree += `${indent}${prefix} ${relativePath}\n`;
    }
  });

  return tree;
}

function collectCodeContent(
  dirPath,
  parentPath = "",
  extensions = Object.keys(extensionToLanguageMap)
) {
  let codeContent = "";
  const filesAndDirs = fs.readdirSync(dirPath);

  filesAndDirs.forEach((fileOrDir) => {
    const fullPath = path.join(dirPath, fileOrDir);
    const relativePath = path.join(parentPath, fileOrDir);

    if (ig.ignores(relativePath)) {
      return;
    }

    const isDir = fs.statSync(fullPath).isDirectory();

    if (isDir) {
      codeContent += collectCodeContent(fullPath, relativePath, extensions);
    } else {
      const ext = path.extname(fileOrDir);
      if (extensions.includes(ext)) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const language = extensionToLanguageMap[ext] || "";
        codeContent += `\nSTART OF FILE ${relativePath}\n\`\`\`${language}\n${fileContent}\n\`\`\`\nEND OF FILE ${relativePath}\n`;
      }
    }
  });

  return codeContent;
}

async function myFunction(args) {
  try {
    if (args.length === 0) {
      throw new Error("Please specify at least one directory.");
    }

    let combinedTree = "";
    let combinedCodeContent = "";

    for (const arg of args) {
      const specifiedDir = path.join(process.cwd(), arg);

      if (
        !fs.existsSync(specifiedDir) ||
        !fs.statSync(specifiedDir).isDirectory()
      ) {
        throw new Error(
          `The specified path (${arg}) either does not exist or is not a directory.`
        );
      }

      const tree = createDirectoryTree(specifiedDir);
      const codeContent = collectCodeContent(specifiedDir);

      combinedTree += `\nProject Structure (${arg}):\n${tree}`;
      combinedCodeContent += codeContent;
    }

    const output = `${combinedTree}\n${combinedCodeContent}`;
    clipboardy.writeSync(output);
    console.log(
      "The directory tree and file contents have been copied to the clipboard."
    );
    console.log(combinedTree);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = { myFunction };
