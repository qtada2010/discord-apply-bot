const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, Client, CommandInteraction, EmbedBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require('discord.js');
const data = require('../../config.json')
module.exports = {
    name: 'setup',
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('اعداد التقديم')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addStringOption(option => option.setName('التقديم').setDescription('القسم الذي تريد اعداده').addChoices(...Object.entries(data.APPLY).map((key) => { return { name: key[1].NAME, value: key[0] } })).setRequired(true)),
    /**
     * @param {CommandInteraction}  interaction 
     * @param {Client} client 
    */
    async execute(client, config, interaction) {
        const apply = config.APPLY[interaction.options.data[0].value];
        const embed = new EmbedBuilder()
            .setDescription(`** - تقديم الإدارة في سيرفر 𝐎𝐍  𝐃𝐈𝐀𝐌𝐎𝐍𝐃 𝐂𝐓𝐘💎 

- اضغط على زر تقديم 1 و عبي نموذج 

- ملاضحة يلزم تحط شعار و رابط سيرفر ببروفايلك حين يتم قبولك اذا تم قبولك أفتح https://discord.com/channels/1136207191863459882/1356027532654411837 

- هديا بلملاين للإدارة رح نقبل كثير ناس لحق قدم **`)
            .setImage(apply.BANNER)
            .setColor('#3498db')
        const select = new StringSelectMenuBuilder()
            .setCustomId(`apply*${interaction.options.data[0].value}`)
            .setPlaceholder('اختيار القسم')
            .addOptions(
                ...Object.values(data.APPLY[interaction.options.data[0].value].DATA).map((key) => {
                    return new StringSelectMenuOptionBuilder()
                        .setEmoji(key.emoji)
                        .setLabel(key.name)
                        .setValue(key.name)

                })
            );

        const row = new ActionRowBuilder()
            .addComponents(select);
        await interaction.reply({ content: "Done", ephemeral: true })
        await interaction.channel.send({ content: ' ', embeds: [embed], components: [row] })

    },

};

