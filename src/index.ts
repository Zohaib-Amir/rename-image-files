import { filterFileNamesByFormat, getBase64URIsForImages, listFileNamesInDirectory, updateFileNames } from './helpers';
import { generateTitles } from './openai';

const IMAGES_DIRECTORY_PATH = 'image-files';
const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.png', '.webp', '.gif'];

async function renameImageFiles(): Promise<void> {
    const allFileNames = listFileNamesInDirectory(IMAGES_DIRECTORY_PATH);
    const imageFileNames = filterFileNamesByFormat(allFileNames, SUPPORTED_IMAGE_FORMATS);

    console.log('Supported image files in directory:\n', imageFileNames);

    if (imageFileNames.length === 0) {
        console.log('No supported image files found in the directory');
        return;
    }

    const base64URIs = getBase64URIsForImages(IMAGES_DIRECTORY_PATH, imageFileNames);
    console.log(`Generated ${base64URIs.length} base64 URIs`);

    console.log('Sending base64 URIs to OpenAI API');
    const apiResponse = await generateTitles(base64URIs);

    console.log('Response from OpenAI API:\n', apiResponse);

    if (!apiResponse) {
        console.error('Unexpected response from OpenAI API, something went wrong');
        return;
    }

    const newFileNames = parseApiTitlesResponse(apiResponse);
    updateFileNames(IMAGES_DIRECTORY_PATH, imageFileNames, newFileNames);
}

function parseApiTitlesResponse(response: string): string[] {
    try {
        return JSON.parse(response);
    } catch (error) {
        console.error('Failed to parse API response:', error);
        throw new Error('Invalid API response format');
    }
}

renameImageFiles();