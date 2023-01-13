class Prize {
  id; // assigned by the server
  funded = false;
  confirmed = false;
  _type; //['NFT', 'OnChainAirdrop', 'Tip.ccTip'],
  get type() {
    return this._type;
  }
  set type(value) {
    if (
      ["NFT", "OnChainAirdrop", "Tip.ccTip"].findIndex(p => {
        return p === value;
      }) === -1
    ) {
      throw Error(
        "Invalid Type. Use one of ['NFT', 'OnChainAirdrop', 'Tip.ccTip']"
      );
    }
    this._type = value;
  }
  name;
  amount; //amount of airdrop/tip
  description; //description of what this prize is
  static returnType(tShort) {
    switch (tShort.toLowerCase()) {
      case "tip":
      case "tip.cctip":
      case "t":
        return "Tip.ccTip";
      default:
        return -1;
    }
  }
}
module.exports = { Prize };
