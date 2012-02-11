var view_diagram = Backbone.View.extend
({
	DrawDiagram: function(a_placeholderName, a_incomeValue, a_outcomeValue)
	{	
		var outputDiagram = new Bluff.Pie(a_placeholderName, '400x400');
    	outputDiagram.title = 'Skillnader mellan inkomster och utgifter';

		outputDiagram.set_theme
		({
	    	colors: ['#12ff00', '#ff0000'],
	    	marker_color: '#ffffff',
	    	font_color: '#ffffff',
	    	background_colors: ['#000000', '#000000']
	  	});
	
	    outputDiagram.data("Inkomster", [a_incomeValue]);
	    outputDiagram.data("Utgifter", [a_outcomeValue]);
	
	    outputDiagram.draw();
	}
});