const Action = require('./Action');
const { Events, Status } = require('../../util/Constants');

class GuildMemberRemoveAction extends Action {
  handle(data, shard) {
    const client = this.client;
    const guild = client.guilds.get(data.guild_id);
    let member = null;
    if (guild) {
      member = guild.members.get(data.user.id);
      guild.memberCount--;
      if (member) {
        guild.voiceStates.delete(member.id);
        member.deleted = true;
        guild.members.remove(member.id);
        if (shard.status === Status.READY) client.emit(Events.GUILD_MEMBER_REMOVE, member);
      }
    }
    return { guild, member };
  }
}

/**
 * Emitted whenever a member leaves a guild, or is kicked.
 * @event Client#guildMemberRemove
 * @param {GuildMember} member The member that has left/been kicked from the guild
 */

module.exports = GuildMemberRemoveAction;
