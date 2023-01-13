const { Prizes } = require("./Prizes");
const { TournamentRoster } = require("./TournamentRoster");
class Tournament {
  id; // assigned by the server
  name;
  rounds = 4;
  picksPerRound = 3;
  maxPlayersPerTeam = 25;
  tournamentType = "ServerPicksFromTeams"; // ['ServerPicksFromTeams', 'PlayersTopPicks', 'OwnerPicks']
  funded = false;
  prizes = new Prizes();
  teams = new TournamentRoster();
  save() {
    /**
     * Write the Tournament Data to file.
     */
  }
  _roundPicks = [];
  get roundPicks() {
    return [...this._roundPicks];
  }
  set roundPicks(value) {
    if (Array.isArray(value)) {
      this._roundPicks = value;
    }
  }

  shuffle(arr) {
    if (!Array.isArray(arr)) return arr;
    function fisherYates(arr) {
      const shuffled = [...arr];
      var count = shuffled.length,
        randomnumber,
        temp;
      while (count) {
        randomnumber = (Math.random() * count--) | 0;
        temp = shuffled[count];
        shuffled[count] = shuffled[randomnumber];
        shuffled[randomnumber] = temp;
      }
      return shuffled;
    }
    return fisherYates(arr);
  }

  compare(a = [], b = []) {
    if (a.length !== b.length) return false;
    var flag = true;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        flag = false;
      }
    }
    return flag;
  }

  _startTime;
  _teamRegistrationDelay;
  _roundDelay;
  _playerSelectionTimeout;

  // compare round choices
  _running = false;
  roundDelayStartCallback = () => {
    console.log("Tell players round is starting.");
  };
  roundDelayEndCallback = () => {
    console.log("Tell players round is ending.");
  };
  playerSelectionStartCallback = () => {
    console.log("Tell players round selection starting.");
  };
  playerSelectionEndCallback = () => {
    console.log("Tell players round selection ending.");
  };
  start(
    roundDelay = 300000,
    playerSelectionTimeout = 300000,
    startTime,
    teamRegistrationDelay
  ) {
    const pickRoundSlot = (choices = ["A", "B"], exclude = ["A"]) => {
      const randomChoices = this.shuffle(choices);
      const solution = randomChoices.shift();
      if (exclude.indexOf(solution) !== -1)
        return pickRoundSlot(choices, exclude);
      return solution;
    };

    const PlayersTopPicks = () => {};

    const OwnerPicks = () => {};

    const ServerPicksFromTeams = () => {
      const selectPrediction = async () => {
        this._running = true;
        for (let i = 0; i > this.rounds; i++) {
          this.roundDelayStartCallback();
          await wait(roundDelay);
          for (let j = 0; j > this.picksPerRound; j++) {
            this.playerSelectionStartCallback();
            await wait(playerSelectionTimeout);
            this.playerSelectionEndCallback();
            /**
             * may want to explude all picks from other rounds, this only expludes from this round.
             */
            this.makeRoundPicks(
              i,
              pickRoundSlot(this.teams.allowed, this.picks[i])
            ); //put limits here
          }
          this.roundDelayEndCallback();
        }
        this._running = false;
      };
      return {
        makePredictions: () => {
          selectPrediction();
          return [...this._roundPicks];
        },
        saveGame: () => {
          return this.saveTournamentRecord();
        },
        getStartTime: () => {
          return Number(this._startTime);
        },
        getTeamRegistrationDelay: () => {
          return Number(this._teamRegistrationDelay);
        },
        getRoundDelay: () => {
          return Number(this._roundDelay);
        },
        getPlayerSelectionTimeout: () => {
          return Number(this._playerSelectionTimeout);
        },
        isRunning: () => {
          return this._running;
        }
      };
    };

    switch (this.tournamentType) {
      case "PlayersTopPicks":
        return PlayersTopPicks();
      case "OwnerPicks":
        return OwnerPicks();
      case "ServerPicksFromTeams":
      default:
        return ServerPicksFromTeams();
    }
  }
  makeRoundPicks(round, pick) {
    if (Array.isArray(this._roundPicks[round])) {
      this._roundPicks[round].push(pick);
    } else {
      this._roundPicks[round] = [pick];
    }
  }
  endGameCallback = () => {
    console.log("Game Over!");
  }
  endGame() {
    this._running = false;
    this._endTime = new Date();
    this.endGameCallback();
  }
  advanceRound() {
    //check all players are ready per round.
    this.currentRound += 1;
  }
  allPlayersReady() {
    const totalPlayers = this.teams.allowed.reduce((p, team) => {
      return p + team.members.length;
    }, 0);
    if (
      this.teams.allowed.reduce((p, team) => {
        return (
          p &&
          team.members.reduced(
            playerP,
            player => {
              return playerP + player.ready === true ? 1 : 0;
            },
            0
          ) === team.members.length
        );
      }, true) === totalPlayers
    ) {
      //all players are ready!
      return true;
    }
    return false;
  }
  currentRound = 0;
  async run() {
    if (this.allPlayersReady()) {
      if (this.currentRound === 0) {
        this.currentRound = 1;
      }
      while (this.currentRound) {
        /**
         * Select winners...
         */
        this.teams.allowed.forEach(async team => {
          team.members.forEach(async player => {
            const picks = player.choices; // ['A', 'B', 'C']
            const round = this._roundPicks[this.currentRound]; // ['A','B', 'C']
            if (this.compare(picks, round)) {
              player.advanceRound();
            } else {
              //does not advance
              player.endGame();
            }
          });
          this.advanceRound();
        });
      }
      this.endGame();
    }
  }

  saveTournamentRecord() {
    const content = JSON.stringify(JSON.parse(JSON.stringify(this)), false, 2);
    fs.writeFileSync(
      path.resolve(path.join(__dirname, "leaderboards", `${this.id}.json`)),
      content
    );
    return content;
  }
}

module.exports = { Tournament };
