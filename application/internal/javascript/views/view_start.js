// The view-class who draws the base interface of the application
var view_start = Backbone.View.extend
({
	// Use the one and only template for the gui, bind to events that happend in the other view-class,
	// and keep the collection with models to a variable
	initialize: function(a_placeholder, a_collection)
	{
		this.template = _.template($('#start').html());
		this.collection_budget_posts = a_collection;
		this.collection_budget_posts.on('destroy', this.fillDiagram, this);
		this.collection_budget_posts.on('change', this.render, this);
	},

	// Call methods in this class with events like mouseclicks etc
	events: {
    	'click #send_post': 'addBudgetPost',
  	},

	// Render a template, fill it with budgetitems and draw the diagram
	render: function()
	{
		$(this.el).html(this.template);
		this.collection_budget_posts.each(this.addSingleItem);
		this.fillDiagram();
	},

	// Add one budgetitem by giving it a category (category and type) and
	// a value with numbers
	addBudgetPost: function()
	{
		// Get the category from the text that you'll see in the <select>
		this.select_category = $('#select_category :selected').text();

		// Get the type (inkomst/utgift) from the selected value in the <select>
		this.select_type = $('#select_category').val();

		// Get the value from the other field
		this.input_value = $('#input_value').val();

		if (this.select_category != '' && this.input_value != '')
		{	
			// Create a new model with all the data that should be in it
			var model = new model_budget_post
			({
				category: this.select_category,
				type: this.select_type,
				value: this.input_value
			});

			// Add a model to the collection (storage)
			this.collection_budget_posts.add(model);

			// Save the model so it will stay in the storage, until it's cleared/or deleted etc
			model.save();
	
			// Clear the category/type and value fields
			this.$('#select_category').val('');
			this.$('#input_value').val('');

			// Draw one budgetitem to the GUI
			this.addSingleItem(model);

			// Update the whole GUI
			this.render();
		}
		else
		{
			apprise('Du måste fylla i samtliga fält!');
		}
	},
	
	// Draw the diagram
	drawDiagram: function(a_incomes, a_outcomes)
	{
		// Output incomes and spendings by showing it in a pie-diagram
		this.outputDiagram = new Bluff.Pie('income_outcome_graph', '600x300');

		// Set the theme of the diagram
		this.outputDiagram.set_theme
		({
	    	marker_color: '#000000',
	    	font_color: '#000000',
	    	background_colors: ['#ffffff', '#ffffff']
	  	});
	
		// Output incomes as green
	    this.outputDiagram.data('Inkomster', [parseInt(a_incomes)], '#00ff00');

		// Output spendings as red
	    this.outputDiagram.data('Utgifter', [parseInt(a_outcomes)], '#ff0000');
	
		// Start it up
	    this.outputDiagram.draw();
	},

	// Draw one row to the GUI
	addSingleItem: function(a_post)
	{
		$('#budgetItems').append(new view_budget_post({model: a_post}).el);
	},
	
	// Fill the diagram with data
	fillDiagram: function()
	{
		incomes = 0;
		outcomes = 0;

		// Hide the labels about what's left and so on
		if (this.collection_budget_posts.length == 0)
		{
			this.$('#budgetOutput').hide();
		}
		else
		{
			this.$('#budgetOutput').show();
		}

		// Count how many items of income and spendings there is
		this.collection_budget_posts.each(function(a_post)
		{
			post = a_post.toJSON();
		
			if (post.type == 'Inkomst')
			{
				incomes += parseInt(post.value); // Count the incomes
			}
			else if (post.type == 'Utgift')
			{
				outcomes += parseInt(post.value); // Count the spendings
			}
		});

		// If there is a income/spending, show labels
		if (incomes != 0 || outcomes != 0)
		{
			$('#budgetSummaryIncomePlaceholder').show();
			$('#budgetSummaryIncome').html((parseInt(incomes) - parseInt(outcomes)) + ' kr');

			$('#budgetSummaryOutcomePlaceholder').show();
			$('#budgetSummaryOutcome').html(parseInt(outcomes) + ' kr');
		}
		// If there isn't a income/spending, hide the labels
		else
		{
			$('#budgetSummaryIncomePlaceholder').hide();
			$('#budgetSummaryIncome').html('');

			$('#budgetSummaryOutcomePlaceholder').hide();
			$('#budgetSummaryOutcome').html('');
		}

		// Call the method who draws the diagram
		this.drawDiagram(incomes, outcomes);
	}
});