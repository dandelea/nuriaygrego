
/*
 * GET home page.
 */
exports.index = function(req, res){
	res.sendFile('index.html', {root: './public/views/public'});
};