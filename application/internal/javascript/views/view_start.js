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
		this.input_name = this.$('#input_name').val();
		this.select_category = this.$('#select_category').val();
		this.input_value = this.$('#input_value').val();
		this.select_type = this.$('#select_type').val();

		if (this.input_name != '' && this.select_category != '' && this.input_value != '' && this.select_type != '')
		{
			this.collection_budget_posts.add
			({
				name: this.input_name, 
				category: this.select_category, 
				value: this.input_value,
				type: this.select_type
			});
	
			this.$('#input_name').val('');
			this.$('#select_type').val('');
			this.$('#input_value').val('');
			this.$('#select_type').val('');

			this.fillWithData();
		}
		else
		{
			alert('Du måste fylla i samtliga fält!');
		}
	},
	
	drawDiagram: function(a_incomes, a_outcomes)
	{
		$('income_outcome_graph').empty();

		var outputDiagram = new Bluff.Pie('income_outcome_graph', '500x500');

		outputDiagram.set_theme
		({
	    	colors: ['#12ff00', '#ff0000'],
	    	marker_color: '#000000',
	    	font_color: '#000000',
	    	background_colors: ['#ffffff', '#ffffff']
	  	});
	
	    outputDiagram.data('Inkomster', [a_incomes]);
	    outputDiagram.data('Utgifter', [a_outcomes]);
	
	    outputDiagram.draw();
	},

	fillWithData: function()
	{
		incomes = 0;
		outcomes = 0;

		_.each(this.collection_budget_posts.toJSON(), function(a_post)
		{
			this.$('table').append
			(
				'<tr>'
				+ '<td>' + a_post.name + '</td>'
				+ '<td>' + a_post.category + '</td>'
				+ '<td>' + a_post.value + '</td>'
				+ '<td>' + a_post.type + '</td>'
				+ '</tr>'
			);

			if (a_post.type == 'Inkomst')
			{
				this.incomes = a_post.value; 
			}
			else if (a_post.type == 'Utgift')
			{
				this.outcomes = a_post.value; 
			}
		});

		this.drawDiagram(incomes, outcomes);
	}
});