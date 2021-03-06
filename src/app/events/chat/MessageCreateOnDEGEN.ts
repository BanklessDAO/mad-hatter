import { Message } from 'discord.js';
import degenPhrases from '../../service/constants/degenPhrases';
import Log, { LogUtils } from '../../utils/Log';
import constants from '../../service/constants/constants';

const MessageCreateOnDEGEN = async (message: Message): Promise<void> => {
	try {
		const content: string = message.content;
		
		if (content.match(/down/gi) || message.mentions.has(constants.DISCORD_BOT_USER_ID)) {
			const randomNum = Math.random();
			if (randomNum >= 0.75) {
				await message.channel.sendTyping();
				await message.channel.send({
					content: `${degenPhrases.down[Math.floor(Math.random() * degenPhrases.down.length)]}`,
				}).catch(Log.error);
			}
			return;
		}
		
		// POAP
		if (content.match(/POAP/gi)) {
			const randomNum = Math.random();
			if (randomNum <= 0.25) {
				await message.channel.sendTyping();
				await message.channel.send({
					content: `${degenPhrases.poap[Math.floor(Math.random() * degenPhrases.poap.length)]}`,
				}).catch(Log.error);
			}
			return;
		}
	
		// APP name
		if (content.match(/Mad Hatter/gi) || message.mentions.has(constants.DISCORD_BOT_USER_ID)) {
			const randomNum = Math.random();
			if (randomNum >= 0.75) {
				await message.channel.sendTyping();
				await message.channel.send({
					content: `${degenPhrases.app[Math.floor(Math.random() * degenPhrases.app.length)]}`,
				}).catch(Log.error);
			}
			return;
		}
		
	} catch (e) {
		LogUtils.logError('failed to reply back message in channel regex', e);
	}
};

export default MessageCreateOnDEGEN;
