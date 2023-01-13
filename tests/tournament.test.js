const { systemUID } = require("../commands/app/systemUID");
const { Tournament } = require("../classes/Tournament");

describe("Basic Class Test Suite", () => {
  it("System UID Instantiates", () => {
    systemUID();
  });
  state = {
    tournamentUID: '78845cd7-48a1-4775-9590-b3efb1bda898',
    tournamentName: 'Rickle',
    rounds: '4',
    picksPerRound: '3',
    maxPlayersPerTeam: '25',
    roundRewards: {
      complete: false,
      firstPlace: {
        type: "t",
        name: "brkl",
        amount: 10,
        description: "10 brkl each"
      },
      secondPlace: {
        type: "t",
        name: "brkl",
        amount: 5,
        description: "5 brkl each"
      },
      thirdPlace: {
        type: "t",
        name: "brkl",
        amount: 1,
        description: "1 brkl each"
      }
    },
    championshipRewards: {
      complete: false,
      firstPlace: {
        type: "t",
        name: "brkl",
        amount: 100,
        description: "100 brkl each"
      },
      secondPlace: {
        type: "t",
        name: "brkl",
        amount: 50,
        description: "50 brkl each"
      },
      thirdPlace: {
        type: "t",
        name: "brkl",
        amount: 25,
        description: "25 brkl each"
      }
    }
  };
  it("Tournament Instantiates", () => {
    new Tournament();
  });

  it("Can set up a tournament", () => {
    const myTournament = new Tournament();
    expect(myTournament).toBeInstanceOf(Tournament);
    const newTournamentUID = systemUID().getUID();
    state.tournamentUID = newTournamentUID;
    myTournament.id = state.tournamentUID;
    myTournament.name = state.tournamentName;
    myTournament.rounds = state.rounds;
    myTournament.picksPerRound = state.picksPerRound;
    myTournament.maxPlayersPerTeam = state.maxPlayersPerTeam;
  });
});
