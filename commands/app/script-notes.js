        
        // -> Tournament Details
        // ->  Tournament Rewards
        // ->  Team Permissions (Which teams can participate.) [Limited|Open]
        switch (interaction.customId) {
          case "createATournamentModal":
            /**
             * the user submitted the first modal
             */
            // validate the submission move on to next step
            /**
             * store the results so you can continue the process
             */
            // prompt -Round Rewards-
            // Buttons x3   Add round Rewards  Add Championship Rewards Cancel
            const rowbasics = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("roundRewardsButton")
                .setLabel("Add round Reward")
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId("championsRewardsButton")
                .setLabel("Add Championship Rewards")
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId("cancelTournamentRewardsButton")
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Danger)
            );

            /**
             * If the user clicks one of the buttons the interaction customId will be triggered.
             */
            await interaction.reply({
              content: "Let's add some rewards and prizes for the winners.",
              components: [rowbasics]
            });

            break;

          /**
           * more logic goes here( LOOKS cleaner! )
           */

          case "roundRewardsButton":
            /**
             * the user clicked the roundRewardsButton on the previous step
             */
            //need to know First Second Or Third Place Prize entry.



            // For each..
            // Next Step is Round Prizes For this Tournament
            
            /**
             * once the interaction modal has completed, we need to see if championship prizes are set
             * otherwise let the user have the chance to set them now.
             */
            /**
             * all the user to set the allowed teams if teams exist, or add another team.
             */
            break;

          case "championsRewardsButton":
            /**
             * the user clicked the championsRewards button on the previous step
             */
            const ChampionshipRewardsModal = new ModalBuilder()
              .setCustomId("championshiptRewardsModal")
              .setTitle("Setup Championship Rewards");

            await interaction.showModal(ChampionshipRewardsModal);

            /**
             * once the interaction modal has completed, we need to see if round prizes are set
             * otherwise let the user have the chance to set them now.
             */

            /**
             * all the user to set the allowed teams if teams exist, or add another team.
             */
            break;
          case "cancelTournamentRewardsButton":
            /**
             * the user clicked the cancel button
             */
            break;
          case "roundRewardsModal":
            // prompt -Champion Reward Prizes
            //add prize 4
            //add prize 5
            //add prize 6

            /**
             * Select Menu interaction
             */
            //Add Teams, Set Allowed Teams Prompt? If Teams < 0

            /**
             * Setup buttons to create a team or set allowed teams.
             */
            //Create Teams Modal

            break;

          case "roundRewardsModal":
            break;
          case "championshiptRewardsModal":
            break;
          default:
            return;
        }