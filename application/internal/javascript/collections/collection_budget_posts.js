// Collection-class for saving/updating/adding the models
// to the localstorage storage base.
var collection_budget_posts = Backbone.Collection.extend
({
	localStorage: new Store("budgetitems")
});