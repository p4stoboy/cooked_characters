import {CharacterProps} from "../types/CharacterProps";
import {openai} from "../openai/openai";
import {ChatCompletion, CreateChatCompletionRequestMessage} from "openai/resources/chat";


export const get_prompt_response = async (prompt: string, char: CharacterProps): Promise<string> => {
    const messages: CreateChatCompletionRequestMessage[] = [
        {role: "system", content: `This is ${char.name}\'s biography: ${char.bio}`},
        {role: "user", content: `you are ${char.name}, respond to this: \"${prompt}\"`},
    ];
    // const completion: ChatCompletion = await openai.chat.completions.create({
    //     messages: messages,
    //     model: "gpt-3.5-turbo",
    //     max_tokens: 200,
    //     temperature: 0.9,
    //     top_p: 1,
    //     presence_penalty: 1,
    //     frequency_penalty: 1,
    //     n: 1,
    // });
    const completion = await openai.completions.create({
        prompt: "This is " + char.name + "'s biography: " + char.bio + "\n" + "you are " + char.name + ", respond to this: \"" + prompt + "\"",
        model: "text-davinci-002",
        max_tokens: 180,
        temperature: 0.9,
        top_p: 1,
        presence_penalty: 1,
        frequency_penalty: 1,
        n: 1,
    });
    // if (!completion || !completion.choices[0].message.content || completion.choices[0].message.content.split(' ').length < 2 || completion.choices[0].message.content.length > 1980) {
    if (!completion || !completion.choices[0].text || completion.choices[0].text.split(' ').length < 2 || completion.choices[0].text.length > 1980) {
        return "Error";
    }
    return completion.choices[0].text;
    // return completion.choices[0].message.content;
}