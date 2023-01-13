module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "setup",
  description: "Setup and Configure the Fruit Bowl Bot",
  options: undefined,
  commands: undefined,
  dm_permission: false,
  default_permission: 8,//admin only
  async execute() {
    const [interaction, ...rest] = arguments;
    


    const subInteractionCommandSet = {

      help: () => {
        
      }
    };
    /**
     * Here we will setup the configuration option we want to allow the administrator to use.
     * We need to allow them to set the bots name.
     * We need to allow them to set and change the primary ping role.
     * We need to allow them to set their inital teams.
     * We need to allow them to choose the total rounds per tournament.
     * We need to allow them to set how many choices per round.
     * We need to allow them to set a default timeout for round registration.
     * We need to allow them to set the rewards.
     * --Payment Types EVM || Tipcc(If whitelisted)
     */
    return interaction.reply("Ping!");
  }
};
