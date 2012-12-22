var beers = null;
var app = null;

var AppRouter = Backbone.Router.extend({

	routes: {
		"" : "list",
		"beers/page/:page" : "list",
		"beers/add"  : "addBeer",
		"beers/:id"  : "beerDetails",
		"about" : "about"
	},

	initialize: function () {
		this.headerView = new HeaderView();
		$('.header').html(this.headerView.el);
	},

	list: function(page) {
		beers.fetch({
			success:_.bind(this.populate, this, page)
		});
		this.headerView.selectMenuItem('home-menu');
	},

    populate: function(page) {
        var p = page ? parseInt(page, 10) : 1;

        $("#content").html(new BeerListView({
            beerCollection: beers,
            page: p
        }).render().el);
    },

	beerDetails: function (id) {
        if (!beers.models.length) {
            this.navigate("", false);

            return;
        }

		$("#content").html(new BeerView({ model: beers.get(id) }).el);
		this.headerView.selectMenuItem();
	},

	addBeer: function() {
		var beer = new Beer();
		$('#content').html(new BeerView({
			model: beer
		}).el);
		this.headerView.selectMenuItem('add-menu');
	},

	about: function () {
		if (!this.aboutView) {
			this.aboutView = new AboutView();
		}
		$('#content').html(this.aboutView.el);
		this.headerView.selectMenuItem('about-menu');
	}

});

utils.loadTemplate(['HeaderView', 'BeerView', 'BeerListItemView', 'AboutView'], function() {

    app = new AppRouter();
    beers = new BeerCollection();

});
