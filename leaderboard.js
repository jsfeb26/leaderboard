// by not using the var keyword the variable PlayerList is in the global scope
PlayerList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      return PlayerList.find();
    }
  });
}

if (Meteor.isServer) {

}
