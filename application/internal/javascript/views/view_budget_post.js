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
			+ '<td>' + this.post.value + ' kr</td>'
			+ '<td><button class="changeItemValue">Ändra värde</button>'
			+ '<button class="deleteItem">Ta bort</button></td>'
		);
	},

	events: {
		'click .deleteItem': 'deleteItemQuestion',
		'click .changeItemValue': 'changeItemQuestion'
	},

	deleteItemQuestion: function()
	{
		var thisModel = this;
		var thisPost = this.model;

		apprise('Vill du ta bort budgetposten bestående av <b>' + this.post.category.toLowerCase() + '</b> på <b>' + this.post.value + ' kr</b>', 
		{'verify':true, 'textYes':'Ja', 'textNo':'Nej', 'animate':'true'}, function(a_removepost)
		{
			if (a_removepost == true)
			{
				thisModel.deleteItem(thisPost);
			}
		});
	},

	deleteItem: function(a_post)
	{
		a_post.destroy();
		$(this.el).remove();
	},

	changeItemQuestion: function()
	{
		var thisModel = this;

		apprise('Skriv in vad du vill ändra värdet på budgetposten bestående av <b>' 
		+ this.post.category.toLowerCase() + '</b> på <b>'  + this.post.value + ' kr</b> till. <br />Och tryck sedan på <b>Spara</b> för att spara detta.'
		+ ' Eller <b>Avbryt</b> för att ha kvar det gamla värdet!', {'input':' ', 'textOk':'Spara', 'textCancel':'Avbryt', 'animate':'true'}, function(a_changepost)
		{
			if (a_changepost != false)
			{
				thisModel.changeItemValue(a_changepost);
			}
		}	
		);
	},
	
	changeItemValue: function(a_value)
	{
		this.model.save({value: a_value});
	}
});