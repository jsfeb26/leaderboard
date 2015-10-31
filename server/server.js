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
