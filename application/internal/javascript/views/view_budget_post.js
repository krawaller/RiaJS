var view_budget_post = Backbone.View.extend
({
	initialize: function()
	{
		color = '';
		post = this.model;

		if (post.type == 'Inkomst')
		{
			color = 'income';
		}
		else if (post.type == 'Utgift')
		{
			color = 'outcome';
		}

		$("#budgetItems").append
		(
			'<tr class=' + color + '>'
			+ '<td>' + post.category + '</td>'
			+ '<td>' + post.type + '</td>'
			+ '<td>' + post.value + '</td>'
			+ '<td><button class="t">Ta bort</button></td>'
			+ '</tr>'
		);
	}
});