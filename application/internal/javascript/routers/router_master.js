var router_master = Backbone.Router.extend
({
	placeholder: '#basePlaceholder',
	cached_views: {},

	routes: {
    	'': 				'start',
		'start': 			'start',

		'updateincome':		'update_income',

		'updateoutcome':	'update_outcome'
  	},

	clearView: function() 
	{
		$(this.placeholder).empty();
	},

	initialize: function()
	{
		this.collection_budget_posts = new collection_budget_posts();
		this.collection_budget_posts.fetch();

		this.view_start = new view_start({el: $(this.placeholder)}, this.collection_budget_posts);
        this.cached_views.view_start = this.view_start;
	},

	start: function()
	{
		this.clearView();
		this.cached_views.view_start.render();
	},

	update_income: function()
	{
		this.clearView();
		this.cached_views.view_create_update.render('Uppdatera äldre inkomst', 'Uppdatera');
	},	

	update_outcome: function()
	{
		this.clearView();
		this.cached_views.view_create_update.render('Uppdatera äldre utgift', 'Uppdatera');
	}
});