import { MessageReaction, PartialUser, User } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';
import messageReactionAddRemoveSquad from './squad/MessageReactionAddRemoveSquad';
import ServiceUtils from '../utils/ServiceUtils';
import { LogUtils } from '../utils/Log';

export default class implements DiscordEvent {
	name = 'messageReactionAdd';
	once = false;

	async execute(reaction: MessageReaction, user: User | PartialUser): Promise<any> {

		try {
			// When a reaction is received, check if the structure is partial
			if (reaction.partial) {
				await reaction.fetch();
			}

			if (user.partial) {
				try {
					await user.fetch();
				} catch (error) {
					LogUtils.logError('failed to pull user partial', error);
					return;
				}
			}

			if (user.bot) {
				return;
			}
			if (ServiceUtils.isBanklessDAO(reaction.message.guild)) {
				await messageReactionAddRemoveSquad(reaction, user as User, 'ADD').catch(e => LogUtils.logError('failed to react to squad', e));
			}
		} catch (e) {
			LogUtils.logError('failed to process event messageReactionAdd', e);
		}
	}
}
