var view_start = Backbone.View.extend
({
	initialize: function()
	{
		this.template = _.template($("#start").html());
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
	
	    outputDiagram.data("Inkomster", [40000]);
	    outputDiagram.data("Utgifter", [8000]);
	
	    outputDiagram.draw();
	}
});