const wait = require("node:timers/promises").setTimeout;
const fs = require("fs");
const path = require("path");
const userOptState = new Map();
const {
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const { Teams } = require("./Teams");
const rickleFantasyFruitBowlBanner = fs.readFileSync(
  path.resolve(__dirname, "../../assets/RickleFantasyFruitBowlBanner.png")
);
const Leaderboard = [];


module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "teams",
  description: "Choose your team to play on.",
  options: undefined,
  commands: [
    {
      name: "list",
      description: `List the team.`
    },
    {
      name: "join",
      description: `Join a team.`
    },
    {
      name: "leave",
      description: `Leave your current team.`
    },
    {
      name: "leaderboard",
      description: `Display the current leaderboard.`
    },
    {
      name: "stats",
      description: `Get a team's current stats.`
    },
    {
      name: "help",
      description: `Helpful information about Teams`
    },
    /**
     * Add On Features.
     */
    {
      name: "create",
      description: "Create a team."
    },
    {
      name: "disband",
      description: "Remove a Team"
    }
  ],
  dm_permission: false,
  default_permission: null,
  async execute() {
    const [interaction, ...rest] = arguments;
    if (interaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await interaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }
    const currentGuild = await this._client.guilds.fetch(interaction.guild.id);

    const GuildRoles = await currentGuild.roles.fetch();

    Teams.forEach(async (team, i) => {
      let existingRole = await GuildRoles.find(guild => {
        return guild.name === team.role;
      });
      if (existingRole) {
        Teams[i].discordRole = existingRole;
      } else {
        currentGuild.roles.create({
          name: team.role,
          color: team.color,
          position: 0,
          mentionable: true,
          managed: true,
          reason: team.slogan
        });
      }
    });

    const currentGuildMember = await currentGuild.members.fetch(
      interaction.user.id
    );

    //console.log("React",  optRole, "Member", MemberRoles);
    const renderTeamStats = team => {
      return `> _Slogan:_ \n> ${team.slogan}
      > _Coach:_ ${team.coach}
      > _Team Captain:_ ${team.captain}
      > _Members:_ ${team.members.length}
      > _Championships:_ ${team.championships}
      > _Wins:_ ${team.wins} 
      > _Losses:_ ${team.losses}
      > _Ties:_ ${team.ties}
      > _Sponsor:_ ${team.sponsor}`;
    };
    const subInteractionCommandSet = {
      list: async () => {
        const embed = this.buildEmbed({
          author: {
            name: "Rickle Fruit Bowl",
            url: "https://github.com/Official-Rickle/Rickle-Fruit-Bowl-Bot"
            /*icon_url: ""*/
          },
          color: "#00e",
          title: "Rickle Fantasy Fruit Bowl",
          description: "Play for free and see if you win!",
          fields: Teams.map(team => ({
            name: team.name,
            value: team.slogan,
            inline: true
          })),
          /*
          image, // Fruit Bowl Large Image
          thumbnail, // Fruit Bowl
          url,
          */
          footer: {
            text: "Powered By: Winston Services"
            /*icon_url: ""*/
          }
        });
        return interaction.reply({ content: "", embeds: [embed] });
      },
      join: async () => {
        let currentTeam = null;
        
        Teams.forEach(team => {
          if(currentTeam === null) {
            let found = currentGuildMember._roles.find((p) => {return p === team.discordRole.id})
            if(found) {
              currentTeam = found;
            };
          }
        });
        if (currentTeam !== null) {
          console.log("User is on a team : ", currentTeam);
          
          const selectedTeam = Teams.find(team => {
            return team.discordRole.id === currentTeam;
          });
          if(selectedTeam) {
            const existingMember = selectedTeam.members.find(member => {
              return member.user.id === currentGuildMember.user.id;
            });
            if (!existingMember) {
              selectedTeam.members.push(currentGuildMember);
            }
            console.log(selectedTeam);
            return interaction.reply(
              "You are already on a team, you will need to leave it first."
            );
          }
        }

        //Load the Choose a team text from file.
        const chooseATeamText = fs.readFileSync(path.resolve(__dirname, 'ChooseATeam.txt'));

        const message = await interaction.reply({
          content: chooseATeamText.toString(),
          fetchReply: true
        });
        /*
        const msg = await interaction.channel.messages.fetch(
          interaction.channel.lastMessageId
        ); //.messages.get(interaction.)
        */
        await message.react("🍒");
        await message.react("🥥");
        await message.react("🍉");
        await message.react("🍍");
        await message.react("🥝");
        await message.react("🍌");
        await message.react("🍊");
        await message.react("🫐");

        const filter = (reaction, user) => {
          // Using reaction means anyone can react, but we dont want just anyone reacting to this.
          switch (reaction.emoji.name) {
            case "🍒":
              return user.id === interaction.user.id;
            case "🥥":
              return user.id === interaction.user.id;
            case "🍉":
              return user.id === interaction.user.id;
            case "🍍":
              return user.id === interaction.user.id;
            case "🥝":
              return user.id === interaction.user.id;
            case "🍌":
              return user.id === interaction.user.id;
            case "🍊":
              return user.id === interaction.user.id;
            case "🫐":
              return user.id === interaction.user.id;
            default:
              return false;
          }
        };

        const collector = message.createReactionCollector({
          filter,
          time: 10000
        });
        const chooseTeam = async (userResponse, chosenTeam) => {
          console.log(currentGuildMember);
          const roleExists = currentGuildMember._roles.find(role => {
            role === chosenTeam.discordRole.id;
          });
          if (!roleExists) {
            // The role doesn't exist on the user so we add it
            // no need to do anything if it does exist.
            currentGuildMember.roles.add(chosenTeam.discordRole);
          }
          const memberExists = chosenTeam.members.find(teamMember => {
            teamMember.user.id === currentGuildMember.user.id;
          });
          if (!memberExists) {
            /**
             * The user was not on the team, so lets add them.
             */
            chosenTeam.members.push(currentGuildMember);
          }
          // console.log(userResponse);
          await interaction.editReply({
            content: `You Chose ${chosenTeam.name} welcome to ${chosenTeam.discordRole}`
          });
          Teams.save();
        };
        collector.on("collect", async userResponse => {
          /**
         * Change the ref to the proper teams.
         */
          switch (userResponse.emoji.name) {
            case "🍒":
              await chooseTeam(userResponse, Teams[0]);
              break;
            case "🥥":
              await chooseTeam(userResponse, Teams[1]);
              break;
            case "🍉":
              await chooseTeam(userResponse, Teams[2]);
              break;
            case "🍍":
              await chooseTeam(userResponse, Teams[3]);
              break;
            case "🥝":
              await chooseTeam(userResponse, Teams[4]);
              break;
            case "🍌":
              await chooseTeam(userResponse, Teams[5]);
              break;
            case "🍊":
              await chooseTeam(userResponse, Teams[6]);
              break;
            case "🫐":
              await chooseTeam(userResponse, Teams[7]);
              break;
            default:
          }
        });

        collector.on("end", async collected => {
          interaction.editReply("Interaction Ended.");
          await wait(1000);
          interaction.deleteReply();
          console.log(interaction.reactions);
        });
      },
      leave: async () => {
        //Load the Choose a team text from file.
        const leaveATeamText = fs.readFileSync(path.resolve(__dirname, 'LeaveATeam.txt'));
        let currentTeam = null;
        
        Teams.forEach(team => {
          if(currentTeam === null) {
            let found = currentGuildMember._roles.find((p) => {return p === team.discordRole.id})
            if(found) {
              currentTeam = found;
            };
          }
        });
        if (currentTeam !== null) {
          console.log("User is on a team : ", currentTeam);
          
          const selectedTeam = Teams.find(team => {
            return team.discordRole.id === currentTeam;
          });
          if(selectedTeam) {
            const existingMember = selectedTeam.members.find(member => {
              return member.user.id === currentGuildMember.user.id;
            });
            if (!existingMember) {
              //remove the user from teams
              selectedTeam.members = selectedTeam.members.filter(memberRecords => { 
                return memberRecords.user.id !== currentGuildMember.user.id
              });
            }

            //remove the users role
            await currentGuildMember.roles.remove(selectedTeam.discordRole.id);
            console.log(selectedTeam);
            Teams.save();
            return interaction.reply(
              leaveATeamText.toString()
            );
          }
        }
      },
      create: async () => {
        const createTeamText = fs.readFileSync(
          path.resolve(__dirname, "CreateATeam.txt")
        );
        interaction.reply(
          createTeamText
            .toString()
            .replace("{TEAM_PLAYER_LIMIT}", process.env.TEAM_PLAYER_LIMIT)
        );
        /**
         * Add the Model to create a team.
         */
      },
      disband: async () => {
        const disbandTeamText = fs.readFileSync(
          path.resolve(__dirname, "DisbandATeam.txt")
        );
        interaction.reply(disbandTeamText.toString());
        /**
         * Add the Model to disband a team.
         */
      },
      leaderboard: async () => {},
      stats: async () => {
        const attachment = new AttachmentBuilder(rickleFantasyFruitBowlBanner, {
          name: "RickleFantasyFruitBowlBanner.png",
          description: "Rickle Fantasy Fruit Bowl"
        });
        const embed = this.buildEmbed({
          author: {
            name: "Rickle Fruit Bowl",
            url: "https://github.com/Official-Rickle/Rickle-Fruit-Bowl-Bot"
            /*icon_url: ""*/
          },
          color: "#00e",
          title: "Rickle Fantasy Fruit Bowl",
          description: "Team statistics and information.",
          fields: Teams.map(team => {
            return {
              name: team.name,
              value: renderTeamStats(team),
              inline: true
            };
          }),
          image: "attachment://RickleFantasyFruitBowlBanner.png",
          /*
          thumbnail, // Fruit Bowl
          url,
          */
          footer: {
            text: "Powered By: Winston Services"
            /*icon_url: ""*/
          }
        });
        return interaction.reply({
          content: "",
          embeds: [embed],
          files: [attachment]
        });
      },
      help: async () => {
        const helpText = fs.readFileSync(
          path.resolve(__dirname, "HelpText.txt")
        );
        const attachment = new AttachmentBuilder(rickleFantasyFruitBowlBanner, {
          name: "RickleFantasyFruitBowlBanner.png",
          description: "Rickle Fantasy Fruit Bowl"
        });
        return interaction.reply({
          content: helpText.toString(),
          files: [attachment]
        });
      }
    };
    switch (interaction.options._subcommand) {
      case "list":
        return subInteractionCommandSet.list();
      case "join":
        return subInteractionCommandSet.join();
      case "leave":
        return subInteractionCommandSet.leave();
      case "leaderboard":
        return subInteractionCommandSet.leaderboard();
      case "stats":
        return subInteractionCommandSet.stats();
      case "create":
        return subInteractionCommandSet.create();
      case "disband":
        return subInteractionCommandSet.create();
      case "help":
        return subInteractionCommandSet.help();
      default:
        return subInteractionCommandSet.help();
    }
  }
};
