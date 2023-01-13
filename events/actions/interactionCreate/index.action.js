require("dotenv");
module.exports = {
  name: "interactionCreateAction",
  async execute () {
    const interaction = arguments[0];
    let command = this.botCommands.find(
      _command => _command.name === interaction.commandName
    );
    if (command !== undefined) {
      // console.log("Interaction Found : ", command);
      return command.execute.call(this, ...arguments);
    }
    if(interaction.customId) {
      // console.log("A custom action executed.", interaction.customId);
      // console.log("Custom Interaction", interaction);

      try {
        /**
         * Handle Custom Id interaction here.
         */
        this.emit(interaction.customId, [interaction, ...arguments]);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.message.interaction !== null) {
      command = botCommands.find(
        _command =>
          _command.name === interaction.message.interaction.commandName
      );
      if (command !== undefined) {
        // console.log("Sub-Interaction Found : ", command);
        return command.execute.call(this, ...arguments);
      }
    }
  }
};
