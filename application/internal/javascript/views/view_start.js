var view_start = Backbone.View.extend
({
	initialize: function(a_placeholder, a_collection)
	{
		this.template = _.template($('#start').html());
		this.collection_budget_posts = a_collection;
	},

	events: {
    	'click #send_post': 'addBudgetPost'
  	},

	render: function()
	{
		$(this.el).html(this.template);
		this.fillWithData();
	},

	addBudgetPost: function()
	{
		this.select_category = this.$('#select_category').val();
		this.input_value = this.$('#input_value').val();

		if (this.select_category != '' && this.input_value != ')
		{
			this.collection_budget_posts.add
			({
				category: this.select_category, 
				value: this.input_value,
			});
	
			this.$('#select_category').val('');
			this.$('#input_value').val('');

			this.fillWithData();
		}
		else
		{
			alert('Du måste fylla i samtliga fält!');
		}
	},
	
	drawDiagram: function(a_incomes, a_outcomes)
	{
		outputDiagram = new Bluff.Pie('income_outcome_graph', '500x500');

		outputDiagram.set_theme
		({
	    	marker_color: '#000000',
	    	font_color: '#000000',
	    	background_colors: ['#ffffff', '#ffffff']
	  	});
	
	    outputDiagram.data('Inkomster', [parseInt(a_incomes)], '#00ff00');
	    outputDiagram.data('Utgifter', [parseInt(a_outcomes)], '#ff0000');
	
	    outputDiagram.draw();
	},

	fillWithData: function()
	{
		incomes = 0;
		outcomes = 0;

		$('tbody').html('');

		_.each(this.collection_budget_posts.toJSON(), function(a_post)
		{
			this.$('table').append
			(
				'<tr>'
				+ '<td>' + a_post.category + '</td>'
				+ '<td>' + a_post.value + '</td>'
				+ '</tr>'
			);

			if (a_post.type == 'Inkomst')
			{
				incomes = a_post.value; 
			}
			else if (a_post.type == 'Utgift')
			{
				outcomes = a_post.value; 
			}
		});

		this.drawDiagram(incomes, outcomes);
	}
});