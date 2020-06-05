const huhubels = {
	huhu: {},
	init: function(app) {
		this.huhu = app;
		this.connect();
	},
	connect: function() {
		let auth = this.huhu.$LSget('auth'), 
				fetcher = {};
		if (!!auth) {
			let serv = this.huhu.$HTTPreq('UserConnect', {doctype: 'json'}),
					huhu = this.huhu
    			fetcher = window.setInterval( function() { 
    									huhu.$http.get(serv, { timeout: 30000 }).then( res => {}, res => {} )
    								}, 30000);
  	}
	}
}


export default huhubels;