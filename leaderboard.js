// by not using the var keyword the variable PlayerList is in the global scope
PlayerList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      return PlayerList.find();
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

  Template.leaderboard.events({
    'click .player': function() {
      Session.set('selectedPlayer', this._id);
    }
  });
}

if (Meteor.isServer) {

}
