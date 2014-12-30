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
		var replace = {
			"$BODYCLASS":lang,
			"$OPERATIONS":count.ops,
			"$LESSONS":count.lessons,
			"$WORDS":count.words,
			"$TEXTWORDS":count[lang].total,
			"$TYPES":count.types,
			"$PAGES": Math.floor(count[lang].total/2500)*10,
			"$UPDATES": _.reduce(info.changelog,function(str,update,version){
				return str+="<dt>"+version+"</dt><dd>"+update[lang]+"</dd>";
			},"<dl>")+"</dl>"
		};
		var path = "../index"+{"sv":"-se","en":""}[lang]+".html";
		var langfile = _.reduce(texts[lang],function(str,cont,key){return str.replace(key,key.substr(1,2)==="MD"?marked(""+cont):cont);},skeleton);
		langfile = _.reduce(replace,function(str,cont,key){return str.replace(key,cont);},langfile);
		fs.writeFile(path,langfile,'utf8',function(err){
			console.log("Wrote "+path);
		});
	});
});