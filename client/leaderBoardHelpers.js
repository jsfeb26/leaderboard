Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
  'player': function() {
    Session.set('selectedPlayer', undefined)

    // -1 sorts by descending and 1 sorts by ascending
    return PlayerList.find({}, { sort: { score: -1, name: 1 } });
  },
  'showSelectedPlayer': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayerList.findOne(selectedPlayer);
  },
  'selectedClass': function() {
    // because helper function is being run inside the each block
    // it has access to the data that's being iterated through
    // so the 'this' context has access to _id, name, score
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');

    if (playerId === selectedPlayer) {
      // name of the selected class
      return "selected";
    }
  }
});
