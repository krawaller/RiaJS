var view_start = Backbone.View.extend
({
	initialize: function(a_placeholder, a_collection)
	{
		this.template = _.template($("#start").html());
		this.collection_budget_posts = a_collection;
		this.incomes = 0;
		this.outcomes = 0;
	},

	events: {
    	"click #send_post": "addBudgetPost"
  	},

	render: function()
	{
		$(this.el).html(this.template);

		var outputDiagram = new Bluff.Pie('income_outcome_graph', '500x500');

		outputDiagram.set_theme
		({
	    	colors: ['#12ff00', '#ff0000'],
	    	marker_color: '#000000',
	    	font_color: '#000000',
	    	background_colors: ['#ffffff', '#ffffff']
	  	});
	
	    outputDiagram.data("Inkomster", [this.incomes]);
	    outputDiagram.data("Utgifter", [this.outcomes]);
	
	    outputDiagram.draw();
	},

	addBudgetPost: function()
	{
		if (this.$("#input_name").val() != '' && this.$("#select_type").val() != '' && this.$("#input_value").val() != '')
		{
			this.collection_budget_posts.add
			({
				name: this.$("#input_name").val(), 
				type: this.$("#select_type").val(), 
				value: this.$("#input_value").val()
			});
	
			this.$("#input_name").val('');
			this.$("#select_type").val('');
			this.$("#input_value").val('');
		}
		else
		{
			alert("Du måste fylla i samtliga fält!");
		}
	}
});