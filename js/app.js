App = Ember.Application.create();

App.Router.map(function() {
  this.resource("about");
  this.resource("posts", function() {
    this.resource("post", { path: ":post_id" });
  });
});


//
// Routes
//
App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo("posts");
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    // '?callback=?' means give me JSONP-formatted results
    return $.getJSON("http://tomdale.net/api/get_recent_posts/?callback=?").then(function(data){

      return data.posts.map(function(post) {
        post.body = post.content;

        return post;
      });
    });

    // return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy("id", params.post_id);
  },
  renderTemplate: function() {
    this.render("post", { into: "posts" })
  }
});


//
// Helpers
//
Ember.Handlebars.helper("format-date", function(date) {
  return moment(date).format("MMM Do, YYYY");
});

Ember.Handlebars.helper("format-markdown", function(input) {
  return new Ember.Handlebars.SafeString(input);
});


//
// Example data so we don't hit Tom's API too much!
// To use, comment lines 23-30 of this file, and uncomment line 32
//
var posts = [
  {
    id: "1",
    title: "Rails is Omakase",
    author: { name: "d2h" },
    date: new Date('12-27-2012'),
    excerpt: "This is the excerpt text for post 1.",
    body: "Sun bathe destroy couch eat grass, throw it back up, make meme, make cute face hunt anything that moves. Poop on grasses curl into a furry donut sleep in the bathroom sink. I like big cats and i can not lie leave fur on owners clothes meowing non stop for food. Eat grass, throw it back up claw drapes, or always hungry. Sleep nap chase mice, yet cough furball love to play with owner's hair tie spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce for leave fur on owners clothes. Caticus cuteicus inspect anything brought into the house under the bed, or missing until dinner time present belly, scratch hand when stroked but stretch. Chase ball of string attack feet under the bed, so chase imaginary bugs, for jump around on couch, meow constantly until given food, yet stand in front of the computer screen. Put toy mouse in food bowl run out of litter box at full speed swat at dog. Eat a plant, kill a hand. Shove bum in owner's face like camera lens bathe private parts with tongue then lick owner's face need to chase tail spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce. Loves cheeseburgers leave hair everywhere, run in circles need to chase tail. Stand in front of the computer screen use lap as chair put toy mouse in food bowl run out of litter box at full speed for claw drapes, for burrow under covers, for curl into a furry donut hiss at vacuum cleaner. Knock over christmas tree eat grass, throw it back up for chew iPad power cord, yet caticus cuteicus chase dog then run away or hide when guests come over swat at dog. Hunt anything that moves cough furball or run in circles, and kick up litter or shake treat bag. Stare at the wall, play with food and get confused by dust present belly, scratch hand when stroked for always hungry i like big cats and i can not lie but sit by the fire. Eat grass, throw it back up hunt by meowing loudly at 5am next to human slave food dispenser. Chase ball of string use lap as chair, but hiss at vacuum cleaner and sweet beast, yet play riveting piece on synthesizer keyboard. Intently stare at the same spot stand in front of the computer screen, yet throwup on your pillow, or need to chase tail, or hide from vacuum cleaner. Hide at bottom of staircase to trip human. Lick butt. Hide from vacuum cleaner sleep in the bathroom sink eat a plant, kill a hand or claws in your leg hide head under blanket so no one can see sweet beast. Rub face on owner stand in front of the computer screen favor packaging over toy. Chew iPad power cord poop on grasses, love to play with owner's hair tie and spread kitty litter all over house. See owner, run in terror. Jump launch to pounce upon little yarn mouse, bare fangs at toy run hide litter box until treats are fed loves cheeseburgers yet chase mice, but leave fur on owners clothes, for hide head under blanket so no one can see or need to chase tail, or hack up furballs. Intrigued by the shower find something else more interesting, but chase mice, for knock over christmas tree shake treat bag. Hate dog leave dead animals as gifts, or chase mice shove bum in owner's face like camera lens sleep on keyboard, but then cats take over the world. Play riveting piece on synthesizer keyboard curl into a furry donut, so i like big cats and i can not lie. Stand in front of the computer screen eat a plant, kill a hand leave fur on owners clothes. Play time. Present belly, scratch hand when stroked intently sniff hand, for hiss at vacuum cleaner cough furball and chew on cable. Pooping rainbow while flying in a toasted bread costume in space hide from vacuum cleaner shake treat bag. Bathe private parts with tongue then lick owner's face chew on cable make muffins, so who's the baby inspect anything brought into the house make muffins. Burrow under covers knock dis off table head butt cant eat out of my own dish. Sweet beast who's the baby. Favor packaging over toy scratch the furniture, knock over christmas tree. Hide from vacuum cleaner stretch, yet leave dead animals as gifts, jump off balcony, onto stranger's head and behind the couch, for plan steps for world domination."
  },
  {
    id: '2',
    title: "The Parley Letter",
    author: { name: "d2h" },
    date: new Date("12-24-2012"),
    excerpt: "This is the excerpt text for post 2.",
    body: "This is the body text for post 2."
  }
];