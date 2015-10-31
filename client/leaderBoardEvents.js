Meteor.subscribe('thePlayers');

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
