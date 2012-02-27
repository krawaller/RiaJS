var view_start = Backbone.View.extend
({
	initialize: function(a_placeholder, a_collection)
	{
		this.template = _.template($('#start').html());
		this.collection_budget_posts = a_collection;
	},

	events: {
    	'click #send_post': 'addBudgetPost',
  	},

	render: function()
	{
		$(this.el).html(this.template);
		this.fillWithData();
	},

	addBudgetPost: function()
	{
		this.select_category = $('#select_category :selected').text();
		this.select_type = $('#select_category').val();
		this.input_value = $('#input_value').val();

		if (this.select_category != '' && this.input_value != '')
		{	
			var model = new model_budget_post
			({
				category: this.select_category,
				type: this.select_type,
				value: this.input_value
			});

			(function(a_post)
			{
				post = _.last(a_post.toJSON(), [1])[0];
				new view_budget_post({id: '#budgetItems', model: post});
			})
			(this.collection_budget_posts.add(model));

			model.save();
	
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
		outputDiagram = new Bluff.Pie('income_outcome_graph', '600x300');

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
		color = '';

		$('tbody').html('');

		_.each(this.collection_budget_posts.toJSON(), function(a_post)
		{
			if (a_post.type == 'Inkomst')
			{
				incomes += parseInt(a_post.value);
				color = 'income';
			}
			else if (a_post.type == 'Utgift')
			{
				outcomes += parseInt(a_post.value); 
				color = 'outcome';
			}

			this.$('table').append
			(
				'<tr class=' + color + '>'
				+ '<td>' + a_post.category + '</td>'
				+ '<td>' + a_post.type + '</td>'
				+ '<td>' + a_post.value + '</td>'
				+ '<td><button class="t">Ta bort</button></td>'
				+ '</tr>'
			);
		});

		if (incomes != 0 || outcomes != 0)
		{
			$('#budgetSummaryPlaceholder').show();
			$('#budgetSummary').html((parseInt(incomes) - parseInt(outcomes)) + ' kr');
		}

		this.drawDiagram(incomes, outcomes);
	}
});