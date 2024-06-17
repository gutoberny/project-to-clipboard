# project-to-clipboard

## Description

A CLI tool to list files from specific directories and copy the result to the clipboard. It supports displaying the directory tree structure and the file contents in a structured format.

## Installation

To install the tool globally, run:

```sh
npm install -g project-to-clipboard
```

## Usage

### Basic Command

To generate the directory tree and copy the contents of files from one or more specific directories to the clipboard, run the following command in the desired directory:

```sh
copy-structure <directory-name1> <directory-name2> ...
```

### Examples

#### Copy Structure and Contents of Directories

If you want to copy the contents of the folders `src/views` and `src/components`:

```sh
copy-structure src/views src/components
```

### Project Structure

```sh
.
├── src
│   ├── views
│   │   └── view1.js
│   └── components
│       └── component1.js
```

The contents of the included files will be copied to the clipboard along with the directory structure.

### package.json Scripts

- `start`: Starts the application.
  ```sh
  npm start
  ```
- `test`: Runs the CLI to check if everything is working correctly.
  ```sh
  npm test
  ```

### Dependencies

- `clipboardy`: To copy text to the clipboard.
- `ignore`: To honor the contents of `.gitignore` and ignore specified files/folders.

## Author

Gustavo Berny

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

# PT-BR

# project-to-clipboard

## Descrição

Uma ferramenta de linha de comando (CLI) para listar arquivos de diretórios específicos e copiar o resultado para a área de transferência. Suporta a exibição da estrutura em árvore dos diretórios e o conteúdo dos arquivos em um formato estruturado.

## Instalação

Para instalar a ferramenta globalmente, execute:

```sh
npm install -g project-to-clipboard
```

## Uso

### Comando Básico

Para gerar a árvore de diretórios e copiar o conteúdo dos arquivos de um ou mais diretórios específicos para a área de transferência, execute o seguinte comando no diretório desejado:

```sh
copy-structure <nome-do-diretorio1> <nome-do-diretorio2> ...
```

### Exemplos

#### Copiar Estrutura e Conteúdo de Diretórios

Se você quiser copiar o conteúdo das pastas `src/views` e `src/components`:

```sh
copy-structure src/views src/components
```

### Estrutura do Projeto

```sh
.
├── src
│   ├── views
│   │   └── view1.js
│   └── components
│       └── component1.js
```

Os conteúdos dos arquivos incluídos serão copiados para a área de transferência junto com a estrutura dos diretórios.

### Scripts do package.json

- `start`: Inicia a aplicação.
  ```sh
  npm start
  ```
- `test`: Executa o CLI para verificar se tudo está funcionando corretamente.
  ```sh
  npm test
  ```

### Dependências

- `clipboardy`: Para copiar texto para a área de transferência.
- `ignore`: Para honrar o conteúdo do `.gitignore` e ignorar arquivos/pastas especificados.

## Autor

Gustavo Berny

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.
