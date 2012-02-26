var view_create_update = Backbone.View.extend
({
	initialize: function()
	{
		this.template = _.template($("#create_update_income_outcome").html());
	},

	render: function(a_head_label, a_button_label)
	{
		$(this.template({head_label: a_head_label, button_label: a_button_label})).appendTo($(this.el));
		$(this.el).html(this.template);
	}
});