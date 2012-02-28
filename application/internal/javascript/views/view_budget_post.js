var view_budget_post = Backbone.View.extend
({
	tagName: 'tr',

	initialize: function()
	{
		this.color = '';
		this.post = this.model.toJSON();
		
		if (this.post.type == 'Inkomst')
		{
			this.color = 'income';
		}
		else if (this.post.type == 'Utgift')
		{
			this.color = 'outcome';
		}

		$(this.el).addClass(this.color).html
		(
			'<td>' + this.post.category + '</td>'
			+ '<td>' + this.post.type + '</td>'
			+ '<td>' + this.post.value + '</td>'
			+ '<td><button class="deleteItem">Ta bort</button></td>'
		);
	},

	events: {
		'click .deleteItem': 'deleteItem',
	},

	deleteItem: function()
	{
		this.model.destroy();
		$(this.el).remove();
	}
});