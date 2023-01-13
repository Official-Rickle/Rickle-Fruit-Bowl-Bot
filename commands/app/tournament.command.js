const wait = require("node:timers/promises").setTimeout;

const fs = require("fs");
const path = require("path");

const { Teams } = require("./Teams");
const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  PermissionFlagsBits,
  ButtonStyle,
  Collection
} = require("discord.js");
const { systemUID } = require("./systemUID");
const { Tournament } = require("../../classes/Tournament");
const { Player } = require("../../classes/Player");
const { Prize } = require("../../classes/Prize");
const { Prizes } = require("../../classes/Prizes");
const { Roster } = require("../../classes/Roster");
const { Team } = require("../../classes/Team");
const { TournamentRoster } = require("../../classes/TournamentRoster");
module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "tournament",
  description: "Rickle Fantasy Fruit Tournaments",
  options: undefined,
  commands: [
    {
      name: "list",
      description: `List the current tournaments.`
    },
    {
      name: "sponsor",
      description: `Sponser a tournament and help reward the Winners.`
    },
    {
      name: "join",
      description: `Join a tournament.`
    },
    {
      name: "leave",
      description: `Leave a tournament.`
    },
    {
      name: "champions",
      description: `Get a list of Tournament Champions.`
    },
    {
      name: "leaderboard",
      description: `Get the current Tournament Leaderboard.`
    },
    {
      name: "create",
      description: "Create a Tournament for teams to join."
    },
    {
      name: "start",
      description: "Start a Tournament you created."
    },
    {
      name: "help",
      description: "Tournament Help and Information"
    }
  ],
  dm_permission: false,
  default_permission: null,
  async execute() {
    const [interaction, cancelInteraction] = arguments;

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

    const subInteractionCommandSet = {
      list: () => {
        /**
         * List the tournaments that are running,
         */
      },
      sponsor: () => {
        /**
         * Register to be a Sponsor for a tournament.
         * Upload Sponsor Banner Image
         * Enter Sponsor URL Link
         * Post address of deposit instructions for donation(Sponsorship)
         */
      },
      join: () => {
        /**
         * Allow the team captain to join a tournament
         */
      },
      leave: () => {
        /**
         * Allow the team captain to leave a tournament
         */
      },
      champions: () => {
        /**
         * List Previous Champions and details on the current Championship.
         */
      },
      leaderboard: () => {
        /**
         * Display details about the current tournament leaderboards
         */
      },
      create: async () => {
        /**
         * allow server admin to create a tournament
         */
        //check if user is admin
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
        //console.log(currentGuildMember, PermissionFlagsBits.Administrator);
        /**
         * Need to find a way to check user permissions
         *  to see if they have the Administrator Permissions,
         *  or -have a Moderation Role for the bot-.(Add this next.)
         */

        //.message.author.server_permissions.administrator:
        if (currentGuild.ownerId !== interaction.member.user.id)
          return interaction.reply(
            "Only the server owner can create a tournament."
          );
        const initialState = {
          step: 0,
          roundRewards: {
            complete: false,
            firstPlace: {},
            secondPlace: {},
            thirdPlace: {}
          },
          championshipRewards: {
            complete: false,
            firstPlace: {},
            secondPlace: {},
            thirdPlace: {}
          }
        };

        if (!this.state) {
          this.state = {
            ...initialState
          };
        }
        const createTournamentModal = new ModalBuilder()
          .setCustomId("createTournamentModal")
          .setTitle("Create A Tournament");

        //add the elements for the basic information about this tournament
        //tournament name
        //rounds
        //picks per round
        //max players per team
        // Add components to modal

        // Create the text input components
        const tournamentNameInput = new TextInputBuilder()
          .setCustomId("tournamentNameInput")
          // The label is the prompt the user sees for this input
          .setLabel("What is the name of this tournament?")
          // Short means only a single line of text
          .setStyle(TextInputStyle.Short);

        const roundsInput = new TextInputBuilder()
          .setCustomId("roundsInput")
          .setLabel("How many rounds should be held?")
          .setStyle(TextInputStyle.Short);

        const picksPerRoundInput = new TextInputBuilder()
          .setCustomId("picksPerRoundInput")
          .setLabel("Picks per rounds should a player get?")
          .setStyle(TextInputStyle.Short);

        const maxPlayersPerTeamInput = new TextInputBuilder()
          .setCustomId("maxPlayersPerTeamInput")
          .setLabel("What is the max players per team?")
          // Paragraph means multiple lines of text.
          .setStyle(TextInputStyle.Short);
        // An action row only holds one text input,
        // so you need one action row per text input.
        //max is 5

        const firstActionRow = new ActionRowBuilder().addComponents(
          tournamentNameInput
        );

        const secondActionRow = new ActionRowBuilder().addComponents(
          roundsInput
        );

        const thirdActionRow = new ActionRowBuilder().addComponents(
          picksPerRoundInput
        );

        const fourthActionRow = new ActionRowBuilder().addComponents(
          maxPlayersPerTeamInput
        );

        // Add inputs to the modal
        createTournamentModal.addComponents(
          firstActionRow,
          secondActionRow,
          thirdActionRow,
          fourthActionRow
        );

        // An action row only holds one text input,
        // so you need one action row per text input.
        const cancelButton = new ButtonBuilder()
          .setCustomId("cancelTournamentButton")
          .setLabel("Cancel")
          .setStyle(ButtonStyle.Danger);

        const roundRewardsFirstPlaceButton = new ButtonBuilder()
          .setCustomId("roundRewardsFirstPlaceButton")
          .setEmoji("🥇")
          .setLabel("First Place")
          .setStyle(ButtonStyle.Primary);
        const roundRewardsSecondPlaceButton = new ButtonBuilder()
          .setCustomId("roundRewardsSecondPlaceButton")
          .setEmoji("🥈")
          .setLabel("Second Place")
          .setStyle(ButtonStyle.Primary);
        const roundRewardsThirdPlaceButton = new ButtonBuilder()
          .setCustomId("roundRewardsThirdPlaceButton")
          .setEmoji("🥉")
          .setLabel("Third Place")
          .setStyle(ButtonStyle.Primary);
        const roundRewardPrizeButtons = new ActionRowBuilder().addComponents(
          roundRewardsFirstPlaceButton,
          roundRewardsSecondPlaceButton,
          roundRewardsThirdPlaceButton,
          cancelButton
        );

        const championshipRewardsFirstPlaceButton = new ButtonBuilder()
          .setCustomId("championshipRewardsFirstPlaceButton")
          .setEmoji("🥇")
          .setLabel("First Place")
          .setStyle(ButtonStyle.Primary);

        const championshipRewardsSecondPlaceButton = new ButtonBuilder()
          .setCustomId("championshipRewardsSecondPlaceButton")
          .setEmoji("🥈")
          .setLabel("Second Place")
          .setStyle(ButtonStyle.Primary);
        const championshipRewardsThirdPlaceButton = new ButtonBuilder()
          .setCustomId("championshipRewardsThirdPlaceButton")
          .setEmoji("🥉")
          .setLabel("Third Place")
          .setStyle(ButtonStyle.Primary);
        const championshipRewardPrizeButtons = new ActionRowBuilder().addComponents(
          championshipRewardsFirstPlaceButton,
          championshipRewardsSecondPlaceButton,
          championshipRewardsThirdPlaceButton,
          cancelButton
        );

        const roundRewardsModal = new ModalBuilder()
          .setCustomId("roundRewardsModal")
          .setTitle("Set up Round Rewards");

        const championshipRewardsModal = new ModalBuilder()
          .setCustomId("championshipRewardsModal")
          .setTitle("Setup Championship Rewards");
        /**
         * Do we limit all prizes to make it simple??
         */
        const prizeTypeInput = new TextInputBuilder()
          .setCustomId("prizeTypeInput")
          // The label is the prompt the user sees for this input
          .setLabel("Prize Type['(N)FT', '(O)nChain', '(T)ip']?")
          // Short means only a single line of text
          .setStyle(TextInputStyle.Short);
        // _type; //['NFT', 'OnChainAirdrop', 'Tip.ccTip'],

        const roundRewardsPrizeTypeActionRow = new ActionRowBuilder().addComponents(
          prizeTypeInput
        );

        const nameInput = new TextInputBuilder()
          .setCustomId("nameInput")
          // The label is the prompt the user sees for this input
          .setLabel("Token Symbol or Contract Address?")
          // Short means only a single line of text
          .setStyle(TextInputStyle.Short);

        // name;
        const roundRewardsPrizeNameActionRow = new ActionRowBuilder().addComponents(
          nameInput
        );

        const amountInput = new TextInputBuilder()
          .setCustomId("amountInput")
          // The label is the prompt the user sees for this input
          .setLabel("Amount Per Person?")
          // Short means only a single line of text
          .setStyle(TextInputStyle.Short);

        // amount; //amount of airdrop/tip
        const roundRewardsPrizeAmountActionRow = new ActionRowBuilder().addComponents(
          amountInput
        );

        const descriptionInput = new TextInputBuilder()
          .setCustomId("descriptionInput")
          // The label is the prompt the user sees for this input
          .setLabel("Prize Description.")
          // Short means only a single line of text
          .setStyle(TextInputStyle.Paragraph);

        // description; //description of what this prize is
        const roundRewardsPrizeDescriptionActionRow = new ActionRowBuilder().addComponents(
          descriptionInput
        );

        //max is 5
        // Add inputs to the modal
        roundRewardsModal.addComponents(
          roundRewardsPrizeTypeActionRow,
          roundRewardsPrizeNameActionRow,
          roundRewardsPrizeAmountActionRow,
          roundRewardsPrizeDescriptionActionRow
        );

        championshipRewardsModal.addComponents(
          roundRewardsPrizeTypeActionRow,
          roundRewardsPrizeNameActionRow,
          roundRewardsPrizeAmountActionRow,
          roundRewardsPrizeDescriptionActionRow
        );

        // butttons x2 Pick Teams, Create Teams
        const teamsButtons = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("createATeamButton")
            .setLabel("Create Teams")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("setAllowedTeamsButton")
            .setLabel("Set Allowed Teams")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("setAllDoneButton")
            .setLabel("All Done!")
            .setStyle(ButtonStyle.Primary),
          cancelButton
        );

        const rolesButtons = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("createATeamRoleButton")
            .setLabel("Create Team Role")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("setTeamRoleButton")
            .setLabel("Set Team Role")
            .setStyle(ButtonStyle.Primary)
        );

        const createTeamModal = new ModalBuilder()
          .setCustomId("createTeamModal")
          .setTitle("Create a Team");

        /*
        "founder": "",//server owner for now...
        "sponsor": "Not Sponsored.", //will be added by other users
        "coach": "Not Selected", //will be selected by team or other command
        "name": "🍍The Pineapples🍍",//required
        "slogan": "The hard Pineapples",//required
        "role": "🍍Pineapples",//required
        "color": "#DBFF0A",//optional
        */
        const teamNameInput = new TextInputBuilder()
          .setCustomId("teamNameInput")
          .setLabel("Enter the name of the Team.")
          .setStyle(TextInputStyle.Short);

        const createTeamNameActionRow = new ActionRowBuilder().addComponents(
          teamNameInput
        );

        const teamSloganInput = new TextInputBuilder()
          .setCustomId("teamSloganInput")
          .setLabel("Choose a team Slogan.")
          .setStyle(TextInputStyle.Short);

        const createTeamSloganActionRow = new ActionRowBuilder().addComponents(
          teamSloganInput
        );

        createTeamModal.addComponents(
          createTeamNameActionRow,
          createTeamSloganActionRow
        );
        //Set Allowed Teams Dropdown

        //Set Winner Selection Type
        /**
       * Will the owner pick each round, or will the bot.
       */

        // await interaction.showModal(ChampionshipRewardsModal);

        if (interaction.options._subcommand === "create") {
          await interaction.showModal(createTournamentModal);
          this.on(
            "createTournamentModal",
            async (responseInteraction, rest) => {
              if (!this.state.hasOwnProperty("tournamentUID")) {
                this.state.tournamentUID = systemUID().getUID();
                this.state.step = 0;
              }

              /**
               * Validate and add the users response.
               */
              const tournamentName = responseInteraction.fields.getTextInputValue(
                "tournamentNameInput"
              );
              const rounds = responseInteraction.fields.getTextInputValue(
                "roundsInput"
              );
              const picksPerRound = responseInteraction.fields.getTextInputValue(
                "picksPerRoundInput"
              );
              const maxPlayersPerTeam = responseInteraction.fields.getTextInputValue(
                "maxPlayersPerTeamInput"
              );
              /**
               * add the user reponse to the state.
               */

              this.state.tournamentName = tournamentName;
              this.state.rounds = rounds;
              this.state.picksPerRound = picksPerRound;
              this.state.maxPlayersPerTeam = maxPlayersPerTeam;

              const roundRewardsButton = new ButtonBuilder()
                .setCustomId("roundRewardsButton")
                .setLabel("Add Round Reward")
                .setEmoji("🎖️")
                .setStyle(ButtonStyle.Primary);
              const championsRewardsButton = new ButtonBuilder()
                .setCustomId("championsRewardsButton")
                .setLabel("Add Championship Rewards")
                .setEmoji("🏆")
                .setStyle(ButtonStyle.Primary);
              const rowbasics = new ActionRowBuilder().addComponents(
                roundRewardsButton,
                championsRewardsButton,
                cancelButton
              );

              /**
               * If the user clicks one of the buttons the interaction customId will be triggered.
               * Round Rewards, Championship Rewards
               */
              await responseInteraction.reply({
                content: "Let's add some rewards and prizes for the winners.",
                components: [rowbasics],
                ephemeral: true
              });

              this.once(
                "cancelTournamentButton",
                async (cancelTrounamentInteraction, rest) => {
                  /**
                   * check the original make sure it deleted.
                   * remove any reference from previous entries.
                   */
                  systemUID().delete(this.state.tournamentUID);
                  try {
                    this.state.categoryInteraction.deleteReply();
                  } catch (error) {
                    //don't do anything cause it really doesn't need to be handled.
                  }
                  this.state = {
                    ...initialState
                  };
                  await cancelTrounamentInteraction.reply({
                    content: "Tournament Canceled.",
                    ephemeral: true
                  });
                  await wait(1000);
                  await cancelTrounamentInteraction.deleteReply();

                  try {
                    await responseInteraction.deleteReply();
                  } catch (error) {
                    //don't do anything cause it really doesn't need to be handled.
                  }
                }
              );

              this.once(
                "roundRewardsButton",
                async (roundRewardsInteraction, rest) => {
                  this.state.category = "round";
                  this.state.step = "roundRewards";
                  try {
                    //check interaction is delete, if not delete it.
                    await responseInteraction.deleteReply();
                  } catch (error) {
                    // ok original message is deleted.
                  }
                  /**
                   * If the user clicks one of the buttons the interaction customId will be triggered.
                   */
                  if (!this.state.categoryInteraction) {
                    this.state.categoryInteraction = roundRewardsInteraction;
                    await roundRewardsInteraction.reply({
                      content:
                        "Let's add round rewards and prizes for the winners.",
                      components: [roundRewardPrizeButtons],
                      ephemeral: true
                    });
                  } else {
                    await this.state.categoryInteraction.editReply({
                      content:
                        "Let's add some round rewards and prizes for the winners.",
                      components: [roundRewardPrizeButtons],
                      ephemeral: true
                    });
                  }
                }
              );

              this.once(
                "championsRewardsButton",
                async (championsRewardsInteraction, rest) => {
                  this.state.category = "championship";
                  this.state.step = "championsRewards";
                  console.log(this.state);
                  /**
                   * If the user clicks one of the buttons the interaction customId will be triggered.
                   */
                  if (!this.state.categoryInteraction) {
                    this.state.categoryInteraction = championsRewardsInteraction;
                    await championsRewardsInteraction.reply({
                      content: "Let's add championship prizes for the winners.",
                      components: [championshipRewardPrizeButtons],
                      ephemeral: true
                    });
                  } else {
                    try {
                      await this.state.categoryInteraction.deleteReply();
                    } catch (error) {
                      // Blah blah
                    }
                    this.state.categoryInteraction = championsRewardsInteraction;
                    await championsRewardsInteraction.reply({
                      content: "Add Championship Prizes.",
                      components: [championshipRewardPrizeButtons],
                      ephemeral: true
                    });
                  }
                }
              );

              this.on(
                "roundRewardsModal",
                async (roundRewardsModalInteraction, rest) => {
                  this.state.roundRewards[this.state.step] = {
                    type: roundRewardsModalInteraction.fields.getTextInputValue(
                      "prizeTypeInput"
                    ),
                    name: roundRewardsModalInteraction.fields.getTextInputValue(
                      "nameInput"
                    ),
                    amount: roundRewardsModalInteraction.fields.getTextInputValue(
                      "amountInput"
                    ),
                    description: roundRewardsModalInteraction.fields.getTextInputValue(
                      "descriptionInput"
                    )
                  };
                  let roundPrizeButtons = [
                    ...roundRewardPrizeButtons.components
                  ];

                  switch (this.state.step) {
                    case "firstPlace":
                      roundPrizeButtons = roundPrizeButtons.filter(
                        p => p.data.custom_id !== "roundRewardsFirstPlaceButton"
                      );
                      break;
                    case "secondPlace":
                      roundPrizeButtons = roundPrizeButtons.filter(
                        p =>
                          p.data.custom_id !== "roundRewardsSecondPlaceButton"
                      );
                      break;
                    case "thirdPlace":
                      roundPrizeButtons = roundPrizeButtons.filter(
                        p => p.data.custom_id !== "roundRewardsThirdPlaceButton"
                      );
                      break;
                  }
                  console.log(this.state, roundPrizeButtons);
                  if (roundPrizeButtons.length !== 1) {
                    /**
                     * Still have more Rewards to set.
                     */
                    roundRewardPrizeButtons.setComponents(...roundPrizeButtons);
                    try {
                      if (
                        this.state.categoryInteraction.custom_id !==
                        "roundRewardsModal"
                      )
                        await this.state.categoryInteraction.deleteReply();
                    } catch (error) {
                      // Blah Blah
                    }
                    this.state.categoryInteraction = roundRewardsModalInteraction;
                    roundRewardsModalInteraction.reply({
                      content:
                        "Let's add more rewards and prizes for the winners.",
                      components: [roundRewardPrizeButtons],
                      ephemeral: true
                    });
                  } else {
                    /**
                     * All Round Rewards have been chosen.
                     */
                    try {
                      await this.state.categoryInteraction.deleteReply();
                    } catch (error) {
                      // Blah Blah
                    }
                    this.state.categoryInteraction = roundRewardsModalInteraction;
                    rowbasics.components.shift();
                    await wait(1000);
                    await roundRewardsModalInteraction.reply({
                      components: [rowbasics],
                      ephemeral: true
                    });
                  }
                }
              );

              this.on(
                "roundRewardsFirstPlaceButton",
                async (roundRewardsFirstPlaceInteraction, rest) => {
                  this.state.previousStep = this.state.step;
                  this.state.step = "firstPlace";
                  await roundRewardsFirstPlaceInteraction.showModal(
                    roundRewardsModal
                  );
                }
              );

              this.on(
                "roundRewardsSecondPlaceButton",
                async (roundRewardsSecondPlaceInteraction, rest) => {
                  this.state.category = "round";
                  this.state.previousStep = this.state.step;
                  this.state.step = "secondPlace";

                  await roundRewardsSecondPlaceInteraction.showModal(
                    roundRewardsModal
                  );
                }
              );

              this.on(
                "roundRewardsThirdPlaceButton",
                async (roundRewardsThirdPlaceInteraction, rest) => {
                  this.state.category = "round";
                  this.state.previousStep = this.state.step;
                  this.state.step = "thirdPlace";
                  await roundRewardsThirdPlaceInteraction.showModal(
                    roundRewardsModal
                  );
                }
              );

              this.on(
                "championshipRewardsModal",
                async (championshipRewardsModalInteraction, rest) => {
                  this.state.championshipRewards[this.state.step] = {
                    type: championshipRewardsModalInteraction.fields.getTextInputValue(
                      "prizeTypeInput"
                    ),
                    name: championshipRewardsModalInteraction.fields.getTextInputValue(
                      "nameInput"
                    ),
                    amount: championshipRewardsModalInteraction.fields.getTextInputValue(
                      "amountInput"
                    ),
                    description: championshipRewardsModalInteraction.fields.getTextInputValue(
                      "descriptionInput"
                    )
                  };
                  let championshipPrizeButtons = [
                    ...championshipRewardPrizeButtons.components
                  ];

                  switch (this.state.step) {
                    case "firstPlace":
                      championshipPrizeButtons = championshipPrizeButtons.filter(
                        p =>
                          p.data.custom_id !==
                          "championshipRewardsFirstPlaceButton"
                      );
                      break;
                    case "secondPlace":
                      championshipPrizeButtons = championshipPrizeButtons.filter(
                        p =>
                          p.data.custom_id !==
                          "championshipRewardsSecondPlaceButton"
                      );
                      break;
                    case "thirdPlace":
                      championshipPrizeButtons = championshipPrizeButtons.filter(
                        p =>
                          p.data.custom_id !==
                          "championshipRewardsThirdPlaceButton"
                      );
                      break;
                  }
                  console.log(this.state, championshipPrizeButtons);
                  if (championshipPrizeButtons.length !== 1) {
                    /**
                     * Still have more Rewards to set.
                     */
                    championshipRewardPrizeButtons.setComponents(
                      ...championshipPrizeButtons
                    );
                    try {
                      await this.state.categoryInteraction.deleteReply();
                    } catch (error) {
                      // blah
                    }
                    this.state.categoryInteraction = championshipRewardsModalInteraction;
                    championshipRewardsModalInteraction.reply({
                      content:
                        "Let's add more championship prizes for the winners.",
                      components: [championshipRewardPrizeButtons],
                      ephemeral: true
                    });
                  } else {
                    /**
                     * All Round Rewards have been chosen.
                     */
                    try {
                      await this.state.categoryInteraction.deleteReply();
                    } catch (error) {
                      // blah
                    }
                    this.state.categoryInteraction = championshipRewardsModalInteraction;
                    await wait(1000);
                    await championshipRewardsModalInteraction.reply({
                      components: [teamsButtons],
                      ephemeral: true
                    });
                  }
                }
              );

              this.on(
                "championshipRewardsFirstPlaceButton",
                async (championshipRewardsFirstPlaceInteraction, rest) => {
                  this.state.category = "championship";
                  this.state.previousStep = this.state.step;
                  this.state.step = "firstPlace";
                  await championshipRewardsFirstPlaceInteraction.showModal(
                    championshipRewardsModal
                  );
                }
              );
              this.on(
                "championshipRewardsSecondPlaceButton",
                async (championshipRewardsSecondPlaceInteraction, rest) => {
                  this.state.category = "championship";
                  this.state.previousStep = this.state.step;
                  this.state.step = "secondPlace";
                  await championshipRewardsSecondPlaceInteraction.showModal(
                    championshipRewardsModal
                  );
                }
              );

              this.on(
                "championshipRewardsThirdPlaceButton",
                async (championshipRewardsThirdPlaceInteraction, rest) => {
                  this.state.category = "championship";
                  this.state.previousStep = this.state.step;
                  this.state.step = "thirdPlace";
                  await championshipRewardsThirdPlaceInteraction.showModal(
                    championshipRewardsModal
                  );
                }
              );

              this.on(
                "createTeamRoleButton",
                (createTeamRoleButtonInteraction, rest) => {
                  createTeamRoleButtonInteraction.reply({
                    content: "createTeamRoleButtonInteraction Ok!",
                    ephemeral: true
                  });
                }
              );

              this.on(
                "createATeamButton",
                (createATeamButtonInteraction, rest) => {
                  createATeamButtonInteraction.reply({
                    content: "createATeamButtonInteraction Ok!",
                    ephemeral: true
                  });
                }
              );

              this.on(
                "setAllowedTeamsButton",
                (setAllowedTeamsButtonInteraction, rest) => {
                  setAllowedTeamsButtonInteraction.reply({
                    content: "setAllowedTeamsButtonInteraction Ok!",
                    ephemeral: true
                  });
                }
              );

              this.once(
                "setAllDoneButton",
                async (setAllDoneButtonInteraction, rest) => {
                  const lastInteraction = this.state.categoryInteraction;
                  this.state.previousStep = this.state.step;
                  this.state.step = "allDone";
                  this.state.categoryInteraction = undefined;
                  fs.writeFileSync(
                    path.resolve(
                      path.join(
                        __dirname,
                        "tournaments",
                        `${this.state.tournamentUID}.json`
                      )
                    ),
                    JSON.stringify(
                      JSON.parse(JSON.stringify(this.state)),
                      false,
                      2
                    )
                  );

                  console.log(
                    this.state,
                    JSON.stringify(
                      JSON.parse(JSON.stringify(this.state)),
                      false,
                      2
                    )
                  );

                  const myTournament = new Tournament();
                  myTournament.id = this.state.tournamentUID;
                  myTournament.name = this.state.tournamentName;
                  myTournament.rounds = this.state.rounds;
                  myTournament.picksPerRound = this.state.picksPerRound;
                  myTournament.maxPlayersPerTeam = this.state.maxPlayersPerTeam;

                  function returnType(tShort) {
                    switch (tShort.toLowerCase()) {
                      case "tip":
                      case "tip.cctip":
                      case "t":
                        return "Tip.ccTip";
                      default:
                        return -1;
                    }
                  }
                  // Ok 6 Total Prizes per Tournament.
                  let myFirstPlacePrize = new Prize();
                  myFirstPlacePrize.type = returnType(
                    this.state.championshipRewards.firstPlace.type
                  );
                  myFirstPlacePrize.name = this.state.championshipRewards.firstPlace.name;
                  myFirstPlacePrize.amount = Number(
                    this.state.championshipRewards.firstPlace.amount
                  ); //'100 brkl each'; // 25 * 100 = 2500
                  myFirstPlacePrize.id = "First Place Championship Prize";
                  myFirstPlacePrize.description = this.state.championshipRewards.firstPlace.description;
                  myTournament.prizes.addChampionshipPrize(
                    myFirstPlacePrize,
                    "firstPlace"
                  );

                  let mySecondPlacePrize = new Prize();
                  mySecondPlacePrize.type = returnType(
                    this.state.championshipRewards.secondPlace.type
                  );
                  mySecondPlacePrize.name = this.state.championshipRewards.secondPlace.name;
                  mySecondPlacePrize.amount = Number(
                    this.state.championshipRewards.secondPlace.amount
                  ); //'50 brkl each';
                  mySecondPlacePrize.id = "Second Place Championship Prize"; // 25 * 50 = 1250
                  mySecondPlacePrize.description = this.state.championshipRewards.secondPlace.description;
                  myTournament.prizes.addChampionshipPrize(
                    mySecondPlacePrize,
                    "secondPlace"
                  );

                  let myThirdPlacePrize = new Prize();
                  myThirdPlacePrize.type = returnType(
                    this.state.championshipRewards.thirdPlace.type
                  );
                  myThirdPlacePrize.name = this.state.championshipRewards.thirdPlace.name;
                  myThirdPlacePrize.amount = Number(
                    this.state.championshipRewards.thirdPlace.amount
                  ); // '25 brkl each';
                  myThirdPlacePrize.id = "Third Place Championship Prize"; // 25 * 25  = 625
                  myThirdPlacePrize.description = this.state.championshipRewards.thirdPlace.description;
                  myTournament.prizes.addChampionshipPrize(
                    myThirdPlacePrize,
                    "thirdPlace"
                  );

                  // 4375
                  myFirstPlacePrize = new Prize();
                  myFirstPlacePrize.type = returnType(
                    this.state.roundRewards.firstPlace.type
                  );
                  myFirstPlacePrize.name = this.state.roundRewards.firstPlace.name;
                  myFirstPlacePrize.amount = Number(
                    this.state.roundRewards.firstPlace.amount
                  ); // '10 brkl each'; //250
                  myFirstPlacePrize.id = "First Place Prize";
                  myFirstPlacePrize.description = this.state.roundRewards.firstPlace.description;
                  myTournament.prizes.addRoundPrize(
                    myFirstPlacePrize,
                    "firstPlace"
                  );

                  mySecondPlacePrize = new Prize();
                  mySecondPlacePrize.type = returnType(
                    this.state.roundRewards.secondPlace.type
                  );
                  mySecondPlacePrize.name = this.state.roundRewards.secondPlace.name;
                  mySecondPlacePrize.amount = Number(
                    this.state.roundRewards.secondPlace.amount
                  ); // '5 brkl each';//125
                  mySecondPlacePrize.id = "Second Place Prize";
                  mySecondPlacePrize.description = this.state.roundRewards.secondPlace.description;
                  myTournament.prizes.addRoundPrize(
                    mySecondPlacePrize,
                    "secondPlace"
                  );

                  myThirdPlacePrize = new Prize();
                  myThirdPlacePrize.type = returnType(
                    this.state.roundRewards.thirdPlace.type
                  );
                  myThirdPlacePrize.name = this.state.roundRewards.thirdPlace.name;
                  myThirdPlacePrize.amount = Number(
                    this.state.roundRewards.thirdPlace.amount
                  ); //'1 brkl each';
                  myThirdPlacePrize.id = "Third Place Prize"; //25
                  myThirdPlacePrize.description = this.state.roundRewards.thirdPlace.description;
                  myTournament.prizes.addRoundPrize(
                    myThirdPlacePrize,
                    "thirdPlace"
                  );

                  myTournament.save();

                  await lastInteraction.editReply({
                    content: "Tournament Saved.",
                    embeds: [
                      this.buildEmbed({
                        author,
                        color: "#eeffee",
                        title: "Tournament Created!",
                        description: myTournament.name
                      })
                    ],
                    components: [],
                    ephemeral: true
                  });
                  this.state = {
                    ...initialState
                  };
                }
              );

              this.on("createTeamModal", (createTeamModalInteraction, rest) => {
                createTeamModalInteraction.reply({
                  content: "createTeamModalInteraction Ok!",
                  ephemeral: true
                });
              });
            }
          );
        }
        //close modal
        //cancel interaction
      },
      start: () => {
        /**
         * allow server admin to start a tournament.
         */
        interaction.reply("Let's get the game going!");
      },
      help: () => {
        /**
         * display the help details about tournaments.
         */
        const TournamentHelpText = fs.readFileSync(
          path.resolve(__dirname, "TournamentHelpText.txt")
        );
        console.log(TournamentHelpText);
        return interaction.reply(TournamentHelpText.toString());
      }
    };
    // console.log("Received Subcommand", interaction.options._subcommand);
    // console.log("Received Custom ID Outer", interaction);
    switch (interaction.options._subcommand) {
      case "list":
        return subInteractionCommandSet.list();
      case "sponsor":
        return subInteractionCommandSet.sponsor();
      case "join":
        return subInteractionCommandSet.join();
      case "leave":
        return subInteractionCommandSet.leave();
      case "champions":
        return subInteractionCommandSet.champions();
      case "leaderboard":
        return subInteractionCommandSet.leaderboard();
      case "create":
        return await subInteractionCommandSet.create();
      case "start":
        return subInteractionCommandSet.start();
      case "help":
        return subInteractionCommandSet.help();
      default:
        return subInteractionCommandSet.help();
    }
  }
};

/*


myTournament.teams.allowed = Teams;
// 400
console.log(myTournament);

// 4375 + 400 = 4775 the owner has to raise 4775 to start this tournament.
*/
