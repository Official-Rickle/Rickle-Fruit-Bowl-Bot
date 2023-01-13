const { systemUID } = require("../commands/app/systemUID");
const { Prize } = require("../classes/Prize");

describe("Basic Class Test Suite", () => {
  it("System UID Instantiates", () => {
    systemUID();
  });
  state = {
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
  it("First Place Championship Prize", () => {
    let myFirstPlacePrize = new Prize();
    myFirstPlacePrize.type = Prize.returnType(
      state.championshipRewards.firstPlace.type
    );
    myFirstPlacePrize.name = state.championshipRewards.firstPlace.name;
    myFirstPlacePrize.amount = Number(
      state.championshipRewards.firstPlace.amount
    ); //'100 brkl each'; // 25 * 100 = 2500
    myFirstPlacePrize.id = "First Place Championship Prize";
    myFirstPlacePrize.description = state.championshipRewards.firstPlace.description;
    // myTournament.prizes.addChampionshipPrize(myFirstPlacePrize, "firstPlace");
  });

  it("Second Place Championship Prize", () => {
    let mySecondPlacePrize = new Prize();
    mySecondPlacePrize.type = Prize.returnType(
      state.championshipRewards.secondPlace.type
    );
    mySecondPlacePrize.name = state.championshipRewards.secondPlace.name;
    mySecondPlacePrize.amount = Number(
      state.championshipRewards.secondPlace.amount
    ); //'50 brkl each';
    mySecondPlacePrize.id = "Second Place Championship Prize"; // 25 * 50 = 1250
    mySecondPlacePrize.description = state.championshipRewards.secondPlace.description;
    // myTournament.prizes.addChampionshipPrize(mySecondPlacePrize, "secondPlace");
  });

  it("Third Place Championship Prize", () => {
    let myThirdPlacePrize = new Prize();
    myThirdPlacePrize.type = Prize.returnType(
      state.championshipRewards.thirdPlace.type
    );
    myThirdPlacePrize.name = state.championshipRewards.thirdPlace.name;
    myThirdPlacePrize.amount = Number(
      state.championshipRewards.thirdPlace.amount
    ); // '25 brkl each';
    myThirdPlacePrize.id = "Third Place Championship Prize"; // 25 * 25  = 625
    myThirdPlacePrize.description = state.championshipRewards.thirdPlace.description;
    // myTournament.prizes.addChampionshipPrize(myThirdPlacePrize, "thirdPlace");
  });

  it("First Place Prize", () => {
    myFirstPlacePrize = new Prize();
    myFirstPlacePrize.type = Prize.returnType(
      state.roundRewards.firstPlace.type
    );
    myFirstPlacePrize.name = state.roundRewards.firstPlace.name;
    myFirstPlacePrize.amount = Number(
      state.roundRewards.firstPlace.amount
    ); // '10 brkl each'; //250
    myFirstPlacePrize.id = "First Place Prize";
    myFirstPlacePrize.description = state.roundRewards.firstPlace.description;
    // myTournament.prizes.addRoundPrize(myFirstPlacePrize, "firstPlace");
  });

  it("Second Place Prize", () => {
    mySecondPlacePrize = new Prize();
    mySecondPlacePrize.type = Prize.returnType(
      state.roundRewards.secondPlace.type
    );
    mySecondPlacePrize.name = state.roundRewards.secondPlace.name;
    mySecondPlacePrize.amount = Number(
      state.roundRewards.secondPlace.amount
    ); // '5 brkl each';//125
    mySecondPlacePrize.id = "Second Place Prize";
    mySecondPlacePrize.description = state.roundRewards.secondPlace.description;
    // myTournament.prizes.addRoundPrize(mySecondPlacePrize, "secondPlace");
  });

  it("Third Place Prize", () => {
    myThirdPlacePrize = new Prize();
    myThirdPlacePrize.type = Prize.returnType(
      state.roundRewards.thirdPlace.type
    );
    myThirdPlacePrize.name = state.roundRewards.thirdPlace.name;
    myThirdPlacePrize.amount = Number(
      state.roundRewards.thirdPlace.amount
    ); //'1 brkl each';
    myThirdPlacePrize.id = "Third Place Prize"; //25
    myThirdPlacePrize.description = state.roundRewards.thirdPlace.description;
    // myTournament.prizes.addRoundPrize(myThirdPlacePrize, "thirdPlace");
  });
});
