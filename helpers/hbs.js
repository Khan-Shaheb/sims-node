module.exports = {
	incrementOne: function (n) {
		return n + 1;
	},
	selected: function (p1, p2) {
		console.log(p1, ' == ', p2);
		if (p1 == p2) return 'selected';
	},
	selected2: function (selected, options) {
		return options
			.fn(this)
			.replace(
				new RegExp(' value="' + selected + '"'),
				'$& selected="selected"'
			);
	},
};
