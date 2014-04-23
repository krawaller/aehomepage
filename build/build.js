var marked = require('marked'),
	fs = require('fs'),
	_ = require('lodash'),
	texts = require('./blocks/texts.js').texts,
	appwwwpath = '../../math3/math3/www/',
	info = require(appwwwpath+'js/app/texts_about').about,
	count = require(appwwwpath+'js/app/texts_count').count;

console.log(Object.keys(info));

fs.readFile("blocks/skeleton.html",function(err,skeleton){
	skeleton = skeleton.toString();
	_.each(["sv","en"],function(lang){
		fs.readFile("blocks/main-"+lang+".md", 'utf8', function(err,content){
			var replace = _.extend({
				"$BODYCLASS":lang,
				"$APPSTOREHREF": {
					en: "https://itunes.apple.com/us/app/algebra-explorer/id850375056?mt=8&uo=4",
					sv: "https://itunes.apple.com/se/app/algebra-explorer/id850375056?mt=8&uo=4"
				}[lang],
				"$CONTENT":marked(content),
				"$OPERATIONS":count.ops,
				"$LESSONS":count.lessons,
				"$WORDS":count.words,
				"$TEXTWORDS":count[lang].total,
				"$TYPES":count.types,
				"$PAGES": Math.floor(count[lang].total/2500)*10,
				"$UPDATES": _.reduce(info.changelog,function(str,update,version){
					return str+="<dt>"+version+"</dt><dd>"+update[lang]+"</dd>";
				},"<dl>")+"</dl>"
			},texts[lang]);
			var langfile = _.reduce(replace,function(str,cont,key){return str.replace(key,cont);},skeleton),
				path = "../index"+{"sv":"-se","en":""}[lang]+".html";
			fs.writeFile(path,langfile,'utf8',function(err){
				console.log("Wrote "+path);
			});
		});
	});
});