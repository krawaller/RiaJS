var view_start = Backbone.View.extend
({
	initialize: function(a_placeholder, a_collection)
	{
		this.template = _.template($('#start').html());
		this.collection_budget_posts = a_collection;
		this.collection_budget_posts.on('destroy', this.fillDiagram, this);
		this.collection_budget_posts.on('change', this.render, this);
	},

	events: {
    	'click #send_post': 'addBudgetPost',
		"keypress #input_value": "addBudgetPostWithKey"
  	},

	render: function()
	{
		$(this.el).html(this.template);
		this.collection_budget_posts.each(this.addSingleItem);
		this.fillDiagram();
	},

	addBudgetPostWithKey: function(a_key)
	{
		if (a_key.keyCode == 13)
		{
			this.addBudgetPost();
		}
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

			this.collection_budget_posts.add(model);

			model.save();
	
			this.$('#select_category').val('');
			this.$('#input_value').val('');

			this.addSingleItem(model);
			this.render();
		}
		else
		{
			apprise('Du måste fylla i samtliga fält!', {'animate': 'true'});
		}
	},
	
	drawDiagram: function(a_incomes, a_outcomes)
	{
		this.outputDiagram = new Bluff.Pie('income_outcome_graph', '600x300');

		this.outputDiagram.set_theme
		({
	    	marker_color: '#000000',
	    	font_color: '#000000',
	    	background_colors: ['#ffffff', '#ffffff']
	  	});
	
	    this.outputDiagram.data('Inkomster', [parseInt(a_incomes)], '#00ff00');
	    this.outputDiagram.data('Utgifter', [parseInt(a_outcomes)], '#ff0000');
	
	    this.outputDiagram.draw();
	},

	addSingleItem: function(a_post)
	{
		$('#budgetItems').append(new view_budget_post({model: a_post}).el);
	},
	
	fillDiagram: function()
	{
		incomes = 0;
		outcomes = 0;

		if (this.collection_budget_posts.length == 0)
		{
			this.$('#budgetOutput').hide();
		}
		else
		{
			this.$('#budgetOutput').show();
		}

		this.collection_budget_posts.each(function(a_post)
		{
			post = a_post.toJSON();
		
			if (post.type == 'Inkomst')
			{
				incomes += parseInt(post.value);
			}
			else if (post.type == 'Utgift')
			{
				outcomes += parseInt(post.value);
			}
		});

		if (incomes != 0 || outcomes != 0)
		{
			$('#budgetSummaryPlaceholder').show();
			$('#budgetSummary').html((parseInt(incomes) - parseInt(outcomes)) + ' kr');
		}
		else
		{
			$('#budgetSummaryPlaceholder').hide();
			$('#budgetSummary').html('');
		}

		this.drawDiagram(incomes, outcomes);
	}
});