
# Rename Image Files

This project is designed to rename image files based on specific criteria. It supports various image formats and integrates with the OpenAI API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Supported Image Formats](#supported-image-formats)
- [License](#license)

## Installation

To install the necessary dependencies, run:

```sh
pnpm install
```

## Usage

To start the project, use the following command:

```sh
pnpm start
```

This will compile the TypeScript files and run the main script.

## Configuration

Ensure you have a `.env` file in the root directory with the necessary environment variables. The project uses the following environment

 variables


- `OPENAI_API_KEY`: Your OpenAI API key.

## Supported Image Formats

These formats are defined in the [`SUPPORTED_IMAGE_FORMATS`](src/index.ts) constant.

## Directory Structure

- `image-files/`: Directory containing the image files to be renamed.
- `src/`: Source code directory.
  - [`helpers.ts`](src/helpers.ts): Contains helper functions like [`convertBufferToBase64URI`](src/helpers.ts).
  - [`index.ts`](src/index.ts): Main entry point of the application.
  - [`openai.ts`](src/openai.ts): Handles interactions with the OpenAI API.
