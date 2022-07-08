// @ts-ignore
import * as config from "../../config";
import { Chat } from "../database/models/Chat";
import { Message } from "../database/models/Message";
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: true });

type msg = {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    language_code: string;
  };
  chat: { id: number; first_name: string; type: string };
  date: number;
  text: string;
  entities?: [{ offset: number; length: string; type: string }];
};

export function onMessage(): void {
  bot.on("message", async (msg: msg) => {
    console.log(msg);
    switch (msg.text) {
      case "/start":
        break;
      default:
        await saveMessage(msg);
        break;
    }
  });
}

async function saveMessage(msg: msg): Promise<void> {
  try {
    const message = new Message();
    message.message_id = msg.message_id;
    message.text = msg.text;
    message.date = msg.date;
    await message.save();

    const chat = await Chat.findOne({ chat_id: msg.chat.id });
    if (!chat) {
      const newChat = new Chat();
      newChat.chat_id = msg.chat.id;
      newChat.title = msg.chat.first_name;
      newChat.is_bot = msg.from.is_bot;
      newChat.language_code = msg.from.language_code;
      newChat.messages = [message];
      await newChat.save();
    } else {
      chat.messages.push(message);
      await chat.save();
    }
  } catch (e) {
    console.log(e);
  }
}
