**Introducing The Rickle Fantasy Fruit Bowl**
---

As part of our on going effort to help people get into the Decentralized financial space we have come up with a tournament for the ages.

Everyone, who plays will have a shot to Win some crypto.


**Rewards**

First place will be awarded 1000 Rickle and a Spin on the Rewards Wheel.

Second Place will be awarded 500 Rickle.

Third Place will be awarded 100 Rickle.

Each month there will be :

    1 First place Winner
    2 Second Place Winners
    3 Third Place Winners
  
**Step One _Choose your team_**

There are 8 Teams to choose from.

    1) :cherries:    🍒 The Cherries
    2) :coconut:      🥥 The Coconuts
    3) :watermelon:   🍉 The Melons
    4) :pineapple:    🍍 The Pineapples
    5) :kiwi:         🥝 The Kiwi's
    6) :banana:       🍌 The Banana's
    7) :tangerine:    🍊 The Tangerines
    8) :blueberries:  🫐 The Blueberries

**Step Two _Pick Your Choices for each Round_**

There will be 4 rounds in each game. You can pick 3 choices, the order in which you pick them matters.
The players who choose each round correctly advance on to the next round.

The Players or Player who successfully makes it through will move on to the finally at the end of the year for a chance to Win 10000 Rickle for their team.

---
---

**Basic Discord Bot**
---
This repositiory is a template to create your own discord bot.

**Installation**
---
For the Basic Discord bot you will need to have NodeJS installed, or download the pre-compiled executable we have provided.
To compile the bot yourself you will need to have NodeJS installed. 
See #compile-the-bot

**Directory Structure**
---
Once you have downloaded this repository you will see inside the folder there are a few files and sub-folders. The following is the basic structure you should see.

    -> 📂commands
    -> 📂events
    -> 📄.env_example
    -> 📄index.js
    -> 📄package-lock.json
    -> 📄package.json
    -> 📄Readme.md (This File)

Inside the commands and events folder contains the files needed to create the commands and instructions for the bots. The `index.js` file is our entry point for the bot and has the basic logic to get our bot running.

The `package-lock.json` and the `package.json` are NodeJs configuration files, and tells NodeJS how to get our bot working.
The `Readme.md` file is this documentation.
***Commands Logic***

In the `commands` sub-folder you will find two folders `app` and `guild`. These folder separate the logic between Global Slash Commands and Guild Slash Commands.

***Slash Command Logic***
---
With in the two folders `app` and `guild` you will create the logic that interacts with the user in discord. The `app` folder contains the logic for the global slash commands the bot will recognize, and the `guild` folder contains the slash command logic for specific guilds.

Each command file will uses the following template.
```JavaScript
module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "",
  description: "",
  options: undefined,
  commands: undefined,
  dm_permission: false,
  default_permission: null,
  async execute() {

  }
};
```

Let's break down the parameters here.

_type_

The type of command this represents. There are three types to choose from. 

1)

2)

3)

_name_

The name of the command. This is the name of the command the user will use to interact with the bot.

_description_

The description of the command. This will be displayed to the user when they attempt to use the command. It's best to keep this short, as it will only show X characters in mobile view when the users use the command.

_optons_

```JavaScript
{
  name: "",
  description: ""
},
```


_commands_

Basic Command Object
```JavaScript
{
  name: "",
  description: ""
},
```

This parameter uses an array of options to create the various sub-commands to a slash command. The basic command object template above is used to create the sub command options.

_dm_permissions_

_default_permission_

Finally you will see the async function `execute` this is where the command logic will go.


***_Global Slash Commands_***

Add global slash commands to your bot with in this section of the application. The app sub-folder contains all of the global slash commands for the bot. This will include direct message's, guilds, and administration commands.

***_Guild Slash Commands_***

Add guild slash commands to your bot
with in this section of the application. The app sub-folder contains all of the global slash commands for the bot. This will 
***_Event Logic_***

With in the `events` sub-folder you will find several files already. These are the events that can be registered with the discord bot. Unless you have specific logic you need to handle during events you wont need to change these files. Instead you will add most of your logic to the actions and commands folders.

With in the Events folder you will find another couple of sub-folders and files.

    -> 📂actions
    -> 📄*.event.js

_A full list of the event files can be found in Appendex A_

***_Action Logic_***

This section is where a majority of you logic will be places for server side interactions and functionality. We have supplied some of the basic events, if you would like to handle other events, simply create the folder with the event name, and add an `index.action.js` file with in the folder.

    -> 📂debug
    -> 📂error
    -> 📂guildCreate
    -> 📂guildDelete
    -> 📂guildIntegrationsUpdate
    -> 📂guildMemberAdd
    -> 📂guildMemberRemove
    -> 📂guildMemberUpdate
    -> 📂interactionCreate
    -> 📂messageCreate
    -> 📂messageDelete
    -> 📂messageReactionAdd
    -> 📂messageUpdate
    -> 📂raw
    -> 📂ready
    -> 📂roleDelete
    -> 📂roleUpdate
    -> 📂shareReady

```JavaScript
/**
 * Action File
 */
module.exports = {
  name: "",
  async execute() {
    /**
     * Action Logic goes here. 
     */
  }
};
```

The name should be set to the name of the action, and your logic should be placed in the execute function.

**Set Up**
---
To begin create a folder where you will store your bot's commands and configurations. I am going to assume you are in the folder `./bot` in your home(root) directory.

Copy the `.env_example` file to `.env` in to this folder.

Go to Discord 

https://discord.com/developers/applications

You will need to initialize your bot with in the discord developer section. Once complete you will get your client id and the token to login with your bot. You will need to put this information in the `.env` file.

```bash
DISCORD_API_USER=
DISCORD_CLIENT_PERMISSIONS=
DISCORD_CLIENT_TOKEN=
```
*Required
The DISCORD_CLIENT_TOKEN should be the token you generated under the bot section of the Discord Developer Site.

*Optional
The DISCORD_API_USER should equal the client id of your new application.
The DISCORD_CLIENT_PERMISSIONS should be the Bitwise number of the permissions you have chosen for your app.

**Adding Event Logic to the bot**

**Adding Slash Commands to the bot**

**Advanced features and functionality**

**Appendex A*
---
This is a list of the event files that come with the basic programs.

    --> 📄events\applicationCommandPermissionsUpdate.event.js
    --> 📄events\cacheSweep.event.js
    --> 📄events\debug.event.js
    --> 📄events\error.event.js
    --> 📄events\guildCreate.event.js
    --> 📄events\guildDelete.event.js
    --> 📄events\guildIntegrationsUpdate.event.js
    --> 📄events\guildMemberAdd.event.js
    --> 📄events\guildMemberRemove.event.js
    --> 📄events\guildMemberUpdate.event.js
    --> 📄events\guildScheduledEventCreate.event.js
    --> 📄events\guildScheduledEventDelete.event.js
    --> 📄events\guildScheduledEventUpdate.event.js
    --> 📄events\guildScheduledEventUserAdd.event.js
    --> 📄events\guildUnavailable.event.js
    --> 📄events\guildUpdate.event.js
    --> 📄events\interactionCreate.event.js
    --> 📄events\inviteCreate.event.js
    --> 📄events\inviteDelete.event.js
    --> 📄events\messageCreate.event.js
    --> 📄events\messageDelete.event.js
    --> 📄events\messageDeleteBulk.event.js
    --> 📄events\messageReactionAdd.event.js
    --> 📄events\messageReactionRemove.event.js
    --> 📄events\messageReactionRemoveAll.event.js
    --> 📄events\messageReactionRemoveEmoji.event.js
    --> 📄events\messageUpdate.event.js
    --> 📄events\raw.event.js
    --> 📄events\ready.event.js
    --> 📄events\roleCreate.event.js
    --> 📄events\roleDelete.event.js
    --> 📄events\roleUpdate.event.js
    --> 📄events\shardDisconnect.event.js
    --> 📄events\shardError.event.js
    --> 📄events\shardReady.event.js
    --> 📄events\shardReconnecting.event.js
    --> 📄events\shardResume.event.js
    --> 📄events\stageInstanceCreate.event.js
    --> 📄events\stageInstanceDelete.event.js
    --> 📄events\stageInstanceUpdate.event.js
    --> 📄events\threadCreate.event.js
    --> 📄events\threadDelete.event.js
    --> 📄events\threadListSync.event.js
    --> 📄events\threadMembersUpdate.event.js
    --> 📄events\threadMemberUpdate.event.js
    --> 📄events\threadUpdate.event.js
    --> 📄events\userUpdate.event.js
    --> 📄events\warn.event.js
    --> 📄events\webhookUpdate.event.js



** Event Emitters
createTournamentModal
    tournamentNameInput
    roundsInput
    picksPerRoundInput
    maxPlayersPerTeamInput
roundRewardsButton
  roundRewardsModal
    roundRewardsFirstPlaceButton
      prizeTypeInput
      nameInput
      amountInput
      descriptionInput
    roundRewardsSecondPlaceButton
    roundRewardsThirdPlaceButton
championsRewardsButton
  championshipRewardsModal
    championshipRewardsFirstPlaceButton
    championshipRewardsSecondPlaceButton
    championshipRewardsThirdPlaceButton


createATeamButton

createTeamModal
  teamNameInput
  teamSloganInput


createATeamRoleButton
setTeamRoleButton
setAllowedTeamsButton
setAllDoneButton

cancelTournamentButton