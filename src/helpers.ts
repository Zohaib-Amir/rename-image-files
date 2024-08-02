import fs from 'fs';

export function listFileNamesInDirectory(directoryPath: string): string[] {
    try {
        const files = fs.readdirSync(directoryPath);
        return files;
    } catch (error) {
        console.error(`Error reading directory ${directoryPath}:`, error);
        return [];
    }
}

export function filterFileNamesByFormat(files: string[], supportedFormats: string[]): string[] {
    return files.filter(file => {
        const fileExtension = getFileExtension(file);
        return supportedFormats.includes(fileExtension);
    });
}

export function getBase64URIsForImages(directoryPath: string, fileNames: string[]): string[] {
    return fileNames.map(fileName => {
        const filePath = `${directoryPath}/${fileName}`;
        const imageBuffer = readFileAsBuffer(filePath);
        const base64URI = convertBufferToBase64URI(imageBuffer, fileName);
        return base64URI;
    });
}

export function updateFileNames(directoryPath: string, oldFileNames: string[], newFileNames: string[]): void {
    if (oldFileNames.length !== newFileNames.length) {
        throw new Error('Number of old file names and new file names should be the same.');
    }

    oldFileNames.forEach((oldFileName, index) => {
        const oldFilePath = `${directoryPath}/${oldFileName}`;
        const newFilePath = `${directoryPath}/${newFileNames[index]}`;
        renameFile(oldFilePath, newFilePath);
    });
}

function getFileExtension(fileName: string): string {
    return fileName.substring(fileName.lastIndexOf('.'));
}

function readFileAsBuffer(filePath: string): Buffer {
    try {
        return fs.readFileSync(filePath);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
}

function convertBufferToBase64URI(buffer: Buffer, fileName: string): string {
    const fileExtension = getFileExtension(fileName).substring(1); // remove the dot from extension
    return `data:image/${fileExtension};base64,${buffer.toString('base64')}`;
}

function renameFile(oldFilePath: string, newFilePath: string): void {
    try {
        fs.renameSync(oldFilePath, newFilePath);
    } catch (error) {
        console.error(`Error renaming file from ${oldFilePath} to ${newFilePath}:`, error);
        throw error;
    }
}
