// by not using the var keyword the variable PlayerList is in the global scope
PlayerList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Meteor.subscribe('thePlayers');

  Template.leaderboard.helpers({
    'player': function() {
      Session.set('selectedPlayer', undefined);

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

  Template.leaderboard.events({
    'click .player': function() {
      Session.set('selectedPlayer', this._id);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function() {
      if (confirm("Are you sure you want to delete this player?"))
      {
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('removePlayerData', selectedPlayer);
      }
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();

      var playerNameVar = event.target.playerName.value;
      Meteor.call('insertPlayerData', playerNameVar);

      event.target.playerName.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId;
    return PlayerList.find({ createdBy: currentUserId });
  });

  Meteor.methods({
    'insertPlayerData': function(playerNameVar) {
      var currentUserId = Meteor.userId();

      PlayerList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer) {
      var currentUserId = Meteor.userId();
      PlayerList.remove({ _id: selectedPlayer, createdBy: currentUserId });
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue) {
      var currentUserId = Meteor.userId();
      PlayerList.update({ _id: selectedPlayer, createdBy: currentUserId }, { $inc: { score: scoreValue } });
    }
  });
}
