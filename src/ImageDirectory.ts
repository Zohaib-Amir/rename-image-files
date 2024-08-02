import fs from 'fs';

export class ImageDirectory {
    private readonly directoryPath: string;
    private readonly supportedFormats: string[];

    constructor(directoryPath: string, supportedFormats: string[]) {
        this.directoryPath = directoryPath;
        this.supportedFormats = supportedFormats;
    }

    public listAllFileNames(): string[] {
        try {
            return fs.readdirSync(this.directoryPath);
        } catch (error) {
            console.error(`Error reading directory ${this.directoryPath}:`, error);
            return [];
        }
    }

    public getImageFileNames(): string[] {
        const allFiles = this.listAllFileNames();
        return allFiles.filter(file => this.isSupportedFormat(file));
    }

    public getBase64URIsForImages(fileNames: string[]): string[] {
        return fileNames.map(fileName => {
            const imageBuffer = this.readFileAsBuffer(fileName);
            return this.convertBufferToBase64URI(imageBuffer, fileName);
        });
    }

    public updateFileNames(oldFileNames: string[], newFileNames: string[]): void {
        if (oldFileNames.length !== newFileNames.length) {
            throw new Error('Number of old file names and new file names should be the same.');
        }

        oldFileNames.forEach((oldFileName, index) => {
            this.renameFile(oldFileName, newFileNames[index]);
        });
    }

    private isSupportedFormat(fileName: string): boolean {
        const fileExtension = this.getFileExtension(fileName);
        return this.supportedFormats.includes(fileExtension);
    }

    private getFileExtension(fileName: string): string {
        return fileName.substring(fileName.lastIndexOf('.'));
    }

    private readFileAsBuffer(fileName: string): Buffer {
        const filePath = `${this.directoryPath}/${fileName}`;
        try {
            return fs.readFileSync(filePath);
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
            throw error;
        }
    }

    private convertBufferToBase64URI(buffer: Buffer, fileName: string): string {
        const fileExtension = this.getFileExtension(fileName).substring(1);
        return `data:image/${fileExtension};base64,${buffer.toString('base64')}`;
    }

    private renameFile(oldFileName: string, newFileName: string): void {
        const oldFilePath = `${this.directoryPath}/${oldFileName}`;
        const newFilePath = `${this.directoryPath}/${newFileName}`;
        try {
            fs.renameSync(oldFilePath, newFilePath);
        } catch (error) {
            console.error(`Error renaming file from ${oldFileName} to ${newFileName}:`, error);
            throw error;
        }
    }
}
