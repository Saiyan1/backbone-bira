window.BeerListView = Backbone.View.extend({

    initialize: function () {
		this.beers = this.options.beerCollection;
        this.beers.bind("change", this.render, this);
        this.beers.bind("destroy", this.render, this);
    },

    render: function () {
        var len = this.beers.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html($("<ul>").addClass("thumbnails"));

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new BeerListItemView({model: this.beers.models[i]}).render().el);
        }

        $(this.el).append(new Paginator({collection: this.beers, page: this.options.page}).render().el);

        return this;
    }
});

window.BeerListItemView = Backbone.View.extend({

    tagName: "li",
    className: "span3",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

	events: {
		"click .remove" : "removeItem"
	},

	removeItem : function () {
		this.model.destroy();
	},

    render: function () {
        var data = this.model.toJSON();
        data["stars"] = [];
        for (var i = 0; i < this.model.get("score"); i++) {
            data["stars"].push(i);
        }

        $(this.el).html(this.template(data));

        var imageURI = this.model.toJSON().image ? "data:image/png;base64," + this.model.toJSON().image.value : "/img/beer.png";

        $(this.el).find(".thumbnail-image").attr("src", imageURI);
        return this;
    }

});