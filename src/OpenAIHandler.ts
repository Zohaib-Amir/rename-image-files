import OpenAI from 'openai';

class OpenAIHandler {
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.openai = new OpenAI({
            apiKey,
        });
    }

    async generateTitles(imageUris: string[]) {
        const prompt = `Given following images, generate title for each image, postfix it with .extension and return it in array of strings without any formatting characters`;

        const response = await this.openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        ...imageUris.map((uri) => ({ type: "image_url" as const, image_url: { url: uri }})),
                    ],
                },
            ],
        });

        return response.choices[0]?.message?.content;
    }
}

export default OpenAIHandler;