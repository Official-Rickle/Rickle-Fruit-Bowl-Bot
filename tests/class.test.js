
const { systemUID } = require("../commands/app/systemUID");
const { Tournament } = require("../classes/Tournament");
const { Player } = require("../classes/Player");
const { Prize } = require("../classes/Prize");
const { Prizes } = require("../classes/Prizes");
const { Roster } = require("../classes/Roster");
const { Team } = require("../classes/Team");
const { TournamentRoster } = require("../classes/TournamentRoster");


describe("Basic Class Test Suite", () => {
    it("System UID Instantiates", () => {
        systemUID();
    });

    it("Tournament Instantiates", () => {
        new Tournament()
    });

    it("Player Instantiates", () => {
        new Player()
    });

    it("Prize Instantiates", () => {
        new Prize();
    });

    it("Prizes Instantiates", () => {
        new Prizes();
    });

    it("Roster Instantiates", () => {
        new Roster({
            team : new Team(),
            players: []
        });
    });

    it("Team Instantiates", () => {
        new Team();
    });

    it("Tournament Roster Instantiates", () => {
        new TournamentRoster();
    });
});