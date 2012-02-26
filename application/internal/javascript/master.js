var libpath = "http://localhost:8888/application/external/javascript/libs/";
var srcpath = "http://localhost:8888/application/internal/javascript/";

head.js
(
	{jquery: libpath + "jquery/jquery.js"},
	{underscore: libpath + "underscore/underscore.js"},
	{backbone: libpath + "backbone/backbone.js"},
	{blocalstorage: libpath + "backbone/backbone.localStorage.js"},
	{bluffextra: libpath + "bluff/js-class.js"},
	{bluff: libpath + "bluff/bluff.js"},
	{routermaster: srcpath + "routers/router_master.js"},
	{viewstart: srcpath + "views/view_start.js"},
	{viewcreateupdate: srcpath + "views/view_create_update.js"},
	{collectionbudgetpost: srcpath + "collections/collection_budget_post.js"},
	{modelbudgetpost: srcpath + "models/model_budget_post.js"}
);

head.ready(function()
{
	this.router_master = new router_master();
	Backbone.history.start();
});