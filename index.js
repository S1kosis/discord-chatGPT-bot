require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client ({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]
})

const { Configuration, openAIApi, OpenAIApi } = require('openai')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration)

client.on('messageCreate' , async (message) => {
    try {
        if (message.author.bot) return
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message.content,
            temperature: 0.5,
            max_tokens: 100,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: ["stop", "ok"]
        });
        console.log(message.contet);
        message.reply(response.data.choices[0].text)
        console.log(response.data.choices[0].text);
    } catch (error) {console.log(error)
    }
})

client.login(process.env.DISCORD_TOKEN);
console.log("Admetus ChatGPT Bot is Online");
