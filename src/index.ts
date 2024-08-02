import ImageFileRenamer from './ImageFileRenamer';
import OpenAIHandler from './OpenAIHandler';

const IMAGES_DIRECTORY_PATH = 'image-files';
const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.png', '.webp', '.gif'];
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

async function renameImageFiles(): Promise<void> {
    const imageFileRenamer = new ImageFileRenamer(
        OPENAI_API_KEY,
        IMAGES_DIRECTORY_PATH,
        SUPPORTED_IMAGE_FORMATS
    );
    await imageFileRenamer.renameImageFiles();
}

renameImageFiles();