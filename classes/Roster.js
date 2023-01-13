const { Team } = require("./Team");
const { Player } = require("./Player");
class Roster {
  team = new Team();
  players = [];
  constructor(params) {
    if (params.hasOwnProperty("team")) {
      if (params.team instanceof Team) {
        this.team = params.team;
      } else this.team = new Team(params.team);
    }

    if (params.hasOwnProperty("players")) {
      if (typeof params.players === "object" && Array.isArray(params.players)) {
        this.players = params.players.map(player => {
          if (player instanceof Player) {
            return player;
          } else return new Player(player);
        });
      }
    }
  }
  setTeam(team) {
    if (team instanceof Team) {
      this.team = team;
      return true;
    } else
      try {
        const newTeam = new Team(team);
        this.team = newTeam;
        return true;
      } catch (error) {
        return false;
      }
  }
  addPlayer(player) {
    if (player instanceof Player) {
      this.players.push(player);
      return true;
    } else {
      try {
        const newPlayer = new Player(player);
        this.players.push(newPlayer);
        return true;
      } catch (error) {
        return false;
      }
    }
  }
  removePlayer(player) {
    if (!player.hasOwnProperty("id")) {
      return false;
    }
    this.players = this.players.filter(existingPlayers => {
      return existingPlayers.id === player.id;
    });
    return true;
  }
}

module.exports = { Roster };
