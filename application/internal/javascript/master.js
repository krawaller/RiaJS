var libpath = "http://localhost:8888/application/external/javascript/libs/";
var srcpath = "http://localhost:8888/application/internal/javascript/";

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

head.ready(function()
{
	this.router_master = new router_master();
	Backbone.history.start();
});