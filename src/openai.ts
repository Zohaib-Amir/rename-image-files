import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTitles(imageUris: string[]) {

    const prompt = `Given following images, generate title for each image, postfix it with .extension and return it in array without any formatting characters`;

    const response = await openai.chat.completions.create({
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