var libpath = "http://localhost:8888/application/external/javascript/libs/";
var srcpath = "http://localhost:8888/application/internal/";

head.js
(
	{jquery: libpath + "jquery/jquery.js"},
	{underscore: libpath + "underscore/underscore.js"},
	{backbone: libpath + "backbone/backbone.js"},
	{blocalstorage: libpath + "backbone/backbone.localStorage.js"},
	{routermaster: srcpath + "routers/router_master.js"}
);

head.ready(function()
{
	this.router_master = new router_master;
	Backbone.history.start();
});