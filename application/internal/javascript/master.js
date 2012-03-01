var libpath = document.location + "application/external/javascript/libs/";
var srcpath = document.location + "application/internal/javascript/";

// Load all the files (external/internal) the project are using
head.js
(
	libpath + "jquery/jquery.js",
	libpath + "underscore/underscore.js",
	libpath + "backbone/backbone.js",
	libpath + "backbone/backbone.localStorage.js",
	libpath + "bluff/js-class.js",
	libpath + "bluff/bluff.js",
	libpath + "apprise/apprise.js",
	srcpath + "routers/router_master.js",
	srcpath + "views/view_start.js",
	srcpath + "collections/collection_budget_posts.js",
	srcpath + "models/model_budget_post.js",
	srcpath + "views/view_budget_post.js"
);

// Start the whole thing by calling the router and
// the history feature in backbone
head.ready(function()
{
	this.router_master = new router_master();
	Backbone.history.start();
});