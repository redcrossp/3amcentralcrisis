// JavaScript Document
let vm = new Vue({
	el: "#app",
	data: {
		track:"",
		artist:"",
		key:"",
		mm:"Major",
		tempo:"",
		acoustic:"",
		dance:"",
		loud:"",
		energy:"",
		limit:"",
		results:[]
	},
	methods: {
		search: function (event) {
			let url = new URL('http://localhost:8080/search');
			let params = {};
			params["track"] = this.track;
			params["artist"] = this.artist;
			params["key"] = this.key + " " + this.mm;
			params["tempo"] = this.tempo;
			params["acoustic"] = this.acoustic;
			params["dance"] = this.dance;
			params["loud"] = this.loud;
			params["energy"] = this.energy;
			params["limit"] = this.limit;

			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
			fetchResults(url);
		},
		convert: function (ms) {
			let seconds = Math.trunc(parseInt(ms)/1000);
			let minutes = Math.trunc(seconds/60);
			seconds = seconds % 60;
			if(seconds < 10) {
				seconds = "0" + seconds
			}
			return minutes + ":" + seconds;
		}
	}
});

async function fetchResults(searchURL) {
	let result = await fetch(searchURL);
	vm.results = await result.json();
}
