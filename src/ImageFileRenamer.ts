import { ImageDirectory } from './ImageDirectory';
import OpenAIHandler from './OpenAIHandler';

class ImageFileRenamer {
    private imageDirectory: ImageDirectory;
    private openAiHandler: OpenAIHandler;

    constructor(
        private readonly openAiApiKey: string,
        private readonly images_directory_path: string,
        private readonly supported_image_formats: string[],
    ) {
        this.imageDirectory = new ImageDirectory(this.images_directory_path, this.supported_image_formats);
        this.openAiHandler = new OpenAIHandler(this.openAiApiKey);
    }

    private parseApiTitlesResponse(response: string): string[] {
        try {
            return JSON.parse(response);
        } catch (error) {
            console.error('Failed to parse API response:', error);
            throw new Error('Invalid API response format');
        }
    }

    public async renameImageFiles(): Promise<void> {
        const imageFileNames = this.imageDirectory.getImageFileNames();

        console.log('Supported image files in directory:\n', imageFileNames);

        if (imageFileNames.length === 0) {
            console.log('No supported image files found in the directory');
            return;
        }

        const base64URIs = this.imageDirectory.getBase64URIsForImages(imageFileNames);
        console.log(`Generated ${base64URIs.length} base64 URIs`);

        console.log('Sending base64 URIs to OpenAI API');
        const apiResponse = await this.openAiHandler.generateTitles(base64URIs);

        console.log('Response from OpenAI API:\n', apiResponse);

        if (!apiResponse) {
            console.error('Unexpected response from OpenAI API, something went wrong');
            return;
        }

        const newFileNames = this.parseApiTitlesResponse(apiResponse);
        this.imageDirectory.updateFileNames(imageFileNames, newFileNames);
    }
}

export default ImageFileRenamer;