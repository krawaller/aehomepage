(function(){var icon,txticon,typeset,_ref,__slice=[].slice,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};_ref=typeof require==="undefined"?this.CATS.app.helpers:require("./helpers"),icon=_ref.icon,txticon=_ref.txticon,typeset=_ref.typeset;CATS.bb.BaseView=Backbone.View.extend({setPrevViewLoc:function(prevviewloc){var str,_ref1,_ref2;str=((_ref1=CATS.texts.ui[prevviewloc])!=null?(_ref2=_ref1.backbtn)!=null?_ref2[CATS.settings.lang]:void 0:void 0)||"";console.log("Ok, here we are:",prevviewloc,str);return this.$(".backbuttontext").text(str.capitalize())},setTitle:function(textid,root,nohelp){var me;if(!this.hastitleelement){this.$el.prepend("<div class='indexedheadline viewtitle'>"+(root?"":"<a href='#' class='gobackbutton'><img class='backbuttonbig' src='images/backbig.svg'/><img class='backbuttonsmall' src='images/backsmall.svg'/><span class='backbuttontext'></span></a>")+"<span></span>"+(nohelp?"":"<a href='#' class='togglehelpbutton'></a>")+"</div><div class='viewtitleafter'></div>");this.hastitleelement=true}me=this;this.$(".indexedheadline > span").html(textid[0]==="<"?textid:this.getText(typeof textid==="string"?["ui",this.localizeid,textid,CATS.settings.lang]:textid,false,false,true));if(window.FastClick){window.FastClick.attach(this.$(".indexedheadline").get(0))}return this.$(".indexedheadline").click(function(e){if(!$(e.srcElement||e.target).is(".togglehelpbutton, .viewsmallhelp, .helplink, img, .gobackbutton, .gobackbutton > span")){console.log("Check failed!",e,e.isDefaultPrevented(),$(e.currentTarget),$(e.currentTarget).is(".togglehelpbutton, .viewsmallhelp, .helplink"));return me.$(".viewcontent, .viewcontent > .sequencecontainer > .sequence:not(.sequencehiddenright,.sequencehiddenleft)").animate({scrollTop:0},200)}})},setContent:function(html,nohelp,justfill){var me;this.$el.addClass(""+this.category+"cat");if(!this.hascontent){this.hascontent=true;if(justfill){return this.$el.html(html)}this.$el.append((nohelp?"":"<div class='viewsmallhelp clearfix wth'></div>")+"<div class='viewcontent'></div><div class='viewcontentafter'></div>")}this.$(".viewcontent").html(html);if(!nohelp){me=this;this.$el.on("click",".togglehelpbutton",function(e){return me.$el.toggleClass("showingsmallhelp")});this.$el.on("click",".viewsmallhelp",function(e){return me.$el.removeClass("showingsmallhelp")});this.$el.on("click",".helplink",function(e){return me.$el.removeClass("showingsmallhelp")});return this.updateHelpLink()}},updateHelpLink:function(el){var mystr,_ref1;mystr=this.me+((typeof this.helpsection==="function"?this.helpsection():void 0)||"");return(el||this.$(".viewsmallhelp")).html("<div>"+(((_ref1=CATS.texts.help[mystr])!=null?_ref1.shorthtml:void 0)||"KORTHJÄLP")+"<a href='#' class='helplink' linkto='"+mystr+"'>"+CATS.texts.ui.base.readmore[CATS.settings.lang]+"</a></div>")},toolLinkAware:function(){console.log(this.me,"is now toollinkaware!");this.listenTo(Backbone,"learnedtool",this.toolToGreen);this.listenTo(Backbone,"forgottool",this.toolToYellow);this.listenTo(Backbone,"losttouchoftool",this.toolToRed);return this.listenTo(Backbone,"qualifiedtool",this.toolToYellow)},killMeFromRoot:function(){this.$el.removeClass("slightlyleft").addClass("sequencehiddenright");return setTimeout(_.bind(this.cleanup,this),500)},lessonLinkAware:function(){console.log("ok,",this.me,"is now lessonlinkaware :)");return this.listenTo(Backbone,"updatelesson",this.updateLessonLink)},updateLessonLink:function(l){var colour;colour=CATS.school.getLessonStatus(l);return this.$(".lessonlink[linkto='"+l+"']").removeClass("red green yellow").addClass(colour)},toolLink:function(toolname,lang,nolink,extraclasses,asterisk){var color,complexicon,def,name,textdef;if(lang==null){lang=CATS.settings.lang}def=CATS.math[toolname];if(!(def!=null?def.info:void 0)){console.log("ALERT ALERT! No tool found: "+toolname)}complexicon=def.info.uses?"tags":"tag";textdef=CATS.texts.tools[toolname][lang];name=typeof textdef!=="string"?textdef.name:textdef;if(asterisk){name="* "+name}color=CATS.school.getToolStatus(toolname);if(nolink){return"<span class='toollink nolink "+color+" "+(extraclasses||[]).join(" ")+"'>"+name+"</span>"}else{return"<a href='#' class='toollink davidlink "+color+" "+(extraclasses||[]).join(" ")+"' linkto='"+toolname+"'>"+name+"</a>"}},lessonLink:function(lessonid,nolink){var lessondef,name,status;lessondef=CATS.school.lessons[lessonid];status=CATS.school.getLessonStatus(lessonid);name=lessondef.headline[CATS.settings.lang];if(nolink){return"<span class='lessonlink nolink "+status+"'>"+name+"</span>"}else{return"<a href='#' class='lessonlink davidlink "+status+"' linkto='"+lessonid+"'>"+name+"</a>"}},wordLink:function(word,lang){if(lang==null){lang=CATS.settings.lang}return"<a href='#' class='davidlink wordlink' linkto='"+word+"'>"+CATS.texts.links[word].headline[lang]+"</a>"},infoLink:function(info,lang){if(lang==null){lang=CATS.settings.lang}return"<a href='#' class='davidlink infolink' linkto='"+info+"'>"+CATS.texts.info[info].headline[lang]+"</a>"},helpLink:function(help,lang){if(lang==null){lang=CATS.settings.lang}return"<a href='#' class='davidlink helplink' linkto='"+help+"'>"+CATS.texts.help[help].headline[lang]+"</a>"},toolToGreen:function(t){console.log(this.me,"fetching all",t,"i happen to have",this.$(".toollink[linkto='"+t+"']").length);return this.$(".toollink[linkto='"+t+"']").removeClass("red yellow").addClass("green")},toolToRed:function(t){return this.$(".toollink[linkto='"+t+"']").removeClass("green yellow").addClass("red")},toolToYellow:function(t){return this.$(".toollink[linkto='"+t+"']").removeClass("red green").addClass("yellow")},updateAllMyToolLinks:function($el){return this.$(".toollink").each(function(i,el){var tname;tname=$(el).attr("linkto");if(tname){return $(el).removeClass("red yellow green").addClass(CATS.school.getToolStatus(tname))}else{return console.log("\nThat's weird, I have a toollink with no linkto",el)}})},escapeStr:function(str){var entityMap;entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};return String(str).replace(/[&<>"'\/]/g,function(s){return entityMap[s]})},identifyYourself:function(){return console.log("PRESENT! ",this.me,this)},getLoadingHTML:function(lang){return"<div class='loader'>"+this.txticon("clock")+"</div>"},getUnderConstructionHTML:function(lang){return"<div class='underconstruction'>"+txticon("construction_cone",true)+" under construction "+txticon("construction_cone",true)+"</div>"},initialize:function(o){return this.idme()},idme:function(){var name,view,_ref1;this.me="UNKNOWN";_ref1=CATS.bb;for(name in _ref1){view=_ref1[name];if(name!=="RootView"&&name!=="BaseView"){if(view===this.constructor){this.me=name;if(!this.localizeid){this.localizeid=CATS.bb[name].prototype.localizeid}}}}this.me=this.me.toLowerCase();console.log("HERE I COME",this.me);return this.listenTo(Backbone,"showofhands",this.identifyYourself)},kill:function(){return this.cleanup()},icon:icon,txticon:txticon,drawPreRenderedPart:function(selector,el,callback){var pre;el=$(el);pre=$("#PRERENDER").find(selector);if(pre.length===0){throw"COULDN'T FIND PRERENDER "+selector}if(CATS.cache.prerenderedparts[selector]){el.html(pre.html());if(callback){return callback()}}else{el.html(this.getLoadingHTML(CATS.settings.lang));return typeset(pre,function(){el.html(pre.html());CATS.cache.prerenderedparts[selector]=true;if(callback){return callback()}})}},cleanup:function(){var view,_i,_len,_ref1;this.$el.remove();_ref1=this.childViews||[];for(_i=0,_len=_ref1.length;_i<_len;_i++){view=_ref1[_i];view.kill()}return this.remove()},setText:function(sel,path,pure,process,neverprocess){var text;text=this.getText(path,pure,process,neverprocess);return this.$(sel).html(text)},reportLink:function(why,datastr){return"<span class='reportlink' linkto='"+why+"|"+datastr+"'>"+txticon("bullhorn")+"</span>"},getText:function(path,pure,alwaysprocess,dontprocess,except){var cache,key,p,reporter,text,_i,_len;reporter=this.reportLink("text",path.join("-"));cache=CATS.cache.texts;key=path.join("|");if(!cache[text]||dontprocess||alwaysprocess||except){text=CATS.texts;for(_i=0,_len=path.length;_i<_len;_i++){p=path[_i];text=text[p];if(text===void 0){return"** MISSING: "+path.join("-")+" **"+reporter}}if(except){text=CATS.texts.processText(text,CATS.settings.lang,except)}else if(!dontprocess){text=cache[key]=CATS.texts.processText(text,CATS.settings.lang)}}if(!pure){return text+reporter}else{return text}},setUI:function(){var classes,iamme,name,search,_i,_len,_results;classes=1<=arguments.length?__slice.call(arguments,0):[];this.ui=this.ui||{};_results=[];for(_i=0,_len=classes.length;_i<_len;_i++){name=classes[_i];search=this.$("."+name);if(!search.length){console.log("WARNING! couldn't find ui",name,this.$el,this.$("."+name),this.$el.find("."+name))}this.ui[name]=this.$("."+name);iamme=this;_results.push(this.ui[name].setText=function(n,me){return function(path,pure,always,neverprocess){if(typeof path==="string"){path=["ui",me.localizeid,path,CATS.settings.lang]}return me.ui[n].html(me.getText(path,pure,always,neverprocess))}}(name,this))}return _results},setUIprocessTexts:function(){var classes,name,_i,_len,_results;classes=1<=arguments.length?__slice.call(arguments,0):[];this.processUIs=(this.processUIs||[]).concat(classes);_results=[];for(_i=0,_len=classes.length;_i<_len;_i++){name=classes[_i];this.setUI(name);_results.push(this.ui[name].html(CATS.texts.processText(this.ui[name].html(),CATS.settings.lang)))}return _results},localize:function(){var lang,textid,ui;if(!this.iamlisteingtolangchange){this.listenTo(Backbone,"setlang",this.localize);this.iamlisteingtolangchange=true}lang=CATS.settings.lang;ui=CATS.texts.ui[this.localizeid];for(textid in ui){this.setText("."+textid,["ui",this.localizeid,textid,lang],textid.match(/button|btn|alternative|bug/),__indexOf.call(this.processUIs||[],textid)>=0,this.noprocess||textid.match(/button|btn|alternative|headline/))}if(this.localizeSpecial){this.localizeSpecial()}return this},typeset:typeset})}).call(this);