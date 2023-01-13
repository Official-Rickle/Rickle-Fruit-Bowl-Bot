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
});