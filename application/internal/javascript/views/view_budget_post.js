// View-class for outputting a single row in the budgetitems
var view_budget_post = Backbone.View.extend
({
	tagName: 'tr', // What will every single item be of?

	// Draw one row and give it the right color
	initialize: function()
	{
		this.color = '';
		this.post = this.model.toJSON(); // Connect against a model
		
		// Set an income-row with a green color
		if (this.post.type == 'Inkomst')
		{
			this.color = 'income';
		}
		// Set an spending-row with a red color
		else if (this.post.type == 'Utgift')
		{
			this.color = 'outcome';
		}

		// Output one row
		$(this.el).html
		(
			'<td class="' + this.color + '">' + this.post.type + '</td>'
			+ '<td>' + this.post.category + '</td>'
			+ '<td>' + this.post.value + ' kr</td>'
			+ '<td><button class="changeItemValue">Ändra värde</button>'
			+ '<button class="deleteItem">Ta bort</button></td>'
		);
	},

	// Call methods in this class with events like mouseclicks etc
	events: {
		'click .deleteItem': 'deleteItemQuestion',
		'click .changeItemValue': 'changeItemQuestion'
	},

	// Show a confirm-question before deleting
	// a row
	deleteItemQuestion: function()
	{
		var thisModel = this;
		var thisPost = this.model;

		apprise('Vill du ta bort budgetposten bestående av <b>' + this.post.category.toLowerCase() + '</b> på <b>' + this.post.value + ' kr</b>', 
		{'verify':true, 'textYes':'Ja', 'textNo':'Nej'}, function(a_removepost)
		{
			if (a_removepost == true)
			{
				thisModel.deleteItem(thisPost);
			}
		});
	},

	// Delete one item from the collection (storage)
	/// and remove it from the GUI
	deleteItem: function(a_post)
	{
		a_post.destroy();
		$(this.el).remove();
	},

	// Show a input-question before changing
	// a row
	changeItemQuestion: function()
	{
		var thisModel = this;

		apprise('Skriv in vad du vill ändra värdet på budgetposten bestående av <b>' 
		+ this.post.category.toLowerCase() + '</b> på <b>'  + this.post.value + ' kr</b> till. <br />Och tryck sedan på <b>Spara</b> för att spara detta.'
		+ ' Eller <b>Avbryt</b> för att ha kvar det gamla värdet!', {'input':' ', 'textOk':'Spara', 'textCancel':'Avbryt'}, function(a_changepost)
		{
			if (a_changepost != false)
			{
				thisModel.changeItemValue(a_changepost);
			}
		}	
		);
	},
	
	// Save a changed row
	changeItemValue: function(a_value)
	{
		this.model.save({value: a_value});
	}
});