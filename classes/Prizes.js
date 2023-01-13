const { Prize } = require("./Prize");
class Prizes {
  championshipPrizes = {
    firstPlace: new Prize(),
    secondPlace: new Prize(),
    thirdPlace: new Prize()
  };
  roundPrizes = {
    firstPlace: new Prize(),
    secondPlace: new Prize(),
    thirdPlace: new Prize()
  };
  addChampionshipPrize(prize, place) {
    if (!prize instanceof Prize) {
      throw Error("Invalid Prize Object");
    }
    switch (place) {
      case "firstPlace":
        this.championshipPrizes.firstPlace = prize;
        break;
      case "secondPlace":
        this.championshipPrizes.secondPlace = prize;
        break;
      case "thirdPlace":
        this.championshipPrizes.thirdPlace = prize;
        break;
      default:
        return false;
    }
    return true;
  }
  addRoundPrize(prize, place) {
    if (!prize instanceof Prize) {
      throw Error("Invalid Prize Object");
    }
    switch (place) {
      case "firstPlace":
        this.roundPrizes.firstPlace = prize;
        break;
      case "secondPlace":
        this.roundPrizes.secondPlace = prize;
        break;
      case "thirdPlace":
        this.roundPrizes.thirdPlace = prize;
        break;
      default:
        return false;
    }
    return true;
  }
}
module.exports = { Prizes };
