// Router-class for pointing the user towards
// the right direction in the application
var router_master = Backbone.Router.extend
({
	placeholder: '#basePlaceholder', // The only placeholder in the html-document
	cached_views: {}, // Hold all the views

	// Send the user to the right direction
	// based on the URL: http://url/#start
	routes: {
    	'': 				'start',
		'start': 			'start'
  	},

	// Clear the view before adding a new one
	clearView: function() 
	{
		$(this.placeholder).empty();
	},

	// Gets all the budgetitems from the storage
	// and output them into the interface.
	// Also start of the views!
	initialize: function()
	{
		this.collection_budget_posts = new collection_budget_posts();
		this.collection_budget_posts.fetch();

		this.view_start = new view_start({el: $(this.placeholder)}, this.collection_budget_posts);
        this.cached_views.view_start = this.view_start;
	},

	// Render the only view in the whole application
	start: function()
	{
		this.clearView();
		this.cached_views.view_start.render();
	}
});