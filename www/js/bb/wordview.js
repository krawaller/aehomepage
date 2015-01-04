(function(){CATS.bb.WordView=CATS.bb.BaseView.extend({localizeid:"word",className:"wordview viewbox",category:"glossary",events:{"click .showexamplesbutton":"showExampleList","click .hideexamplesbutton":"hideExampleList"},render:function(){this.toolLinkAware();return this},renderItem:function(){this.hasrendereditem=true;this.setContent(CATS.cache.templates["#wordviewtemplate"]);this.setUI("missionbox","writeexamplelist","lessonlistbox","lessonlist","writeinstruction","writeparagraph","redirectedfrom","wordname","mathex","worddescription","worddescriptionheadline","basicopsheadline","complexopsheadline","basiclist","complexlist","toollists","basiclistdesc","complexlistdesc","basicsimplelist","basicexamplelist","complexsimplelist","complexexamplelist");return this},showItem:function(word){var def,examples,lang,lessonid,str,_ref;this.word=word;console.log("WOOORD",word);lang=CATS.settings.lang;if(!this.hasrendereditem){this.renderItem()}def=CATS.texts.links[word];if(def.redirectto){this.redirectedfrom=word;this.ui.redirectedfrom.html(this.ui.redirectedfrom.html().replace("%OP",def.headline[lang]));this.word=word=def.redirectto;def=CATS.texts.links[word]}else{this.ui.redirectedfrom.hide()}this.cachedlist=CATS.texts.getCachedToolListsForTag(word);this.setTitle(["links",word,"headline",lang]);this.setText(this.ui.worddescription,["links",word,"description",lang],false,false,true);if(CATS.texts.maths[word]){this.ui.mathex.show();this.drawPreRenderedPart("#MATH"+word+" > ."+lang,this.ui.mathex,this.updateAllMyToolLinks)}else{this.ui.mathex.hide()}if(def.redirectto||this.cachedlist.basic+this.cachedlist.complex===0){this.ui.toollists.hide()}else{this.ui.toollists.show();this.drawSimpleLists()}if(def.write){this.setText(this.ui.writeparagraph,["links",word,"write",lang],false,false,true);examples=def.write["write_"+lang]||def.write.write;if(examples){this.ui.writeexamplelist.html(function(){var _i,_len,_results;_results=[];for(_i=0,_len=examples.length;_i<_len;_i++){str=examples[_i];_results.push("<a href='#' class='expressionitem davidlink'>"+str.replace("<","&lt;").replace(">","&gt;")+"</a>")}return _results}().join(" "))}else{this.ui.writeexamplelist.hide()}}else{this.ui.writeinstruction.hide()}if(def.hasmath){this.ui.worddescription.html(this.ui.worddescription.html().replace(/MATH\[([^\[\]]*)]/g,function(part,mathstr,a,b,c){console.log("MAATH",part,"STR",mathstr);return $("#MATH"+mathstr+" > ."+lang).html()}));this.typeset(this.ui.worddescription)}if((_ref=def.lessons)!=null?_ref.length:void 0){this.ui.lessonlist.html(function(){var _i,_len,_ref1,_results;_ref1=def.lessons;_results=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){lessonid=_ref1[_i];_results.push(this.lessonLink(lessonid))}return _results}.call(this).join(""))}else{this.ui.lessonlistbox.hide()}this.updateMission();this.listenTo(Backbone,"updatemission",this.updateMission);return this.listenTo(Backbone,"updatelesson",this.updateMission)},drawSimpleLists:function(){var count,def,kind,lang,toolarr,word,_i,_len,_ref;word=this.word;lang=CATS.settings.lang;def=CATS.texts.links[word];_ref=["basic","complex"];for(_i=0,_len=_ref.length;_i<_len;_i++){kind=_ref[_i];count=this.cachedlist[kind];if(count===0){this.ui[kind+"listdesc"].setText("therearenotools"+kind+(def.category?"cat":""),false,false,true);this.ui[kind+"list"].empty()}else{toolarr=CATS.texts.toolTagIndex[word][kind];this.ui[kind+"listdesc"].setText((count>1?"therearemanytools"+kind:"thereisonetool"+kind)+(def.category?"cat":""),false,false,true);this.ui[kind+"listdesc"].html(this.ui[kind+"listdesc"].html().replace("%s",CATS.texts.numberStr(count,lang)));this.drawPreRenderedPart("#WORDLIST"+word+" > ."+lang+"_"+kind+" > .simplelist",this.ui[kind+"simplelist"])}this.ui[kind+"listdesc"].html(this.ui[kind+"listdesc"].html()+" "+def.headline[lang]+(count?":":"."))}return this.updateAllMyToolLinks()},showExampleList:function(e){var button,kind,lang,old,word;button=$(e.srcElement||e.target).closest("button");word=this.word;lang=CATS.settings.lang;kind=button.attr("data-kind");console.log("OK, examples for ",kind);if(this["havedrawn"+kind]){return this.changeToExampleList(kind)}else{old=button.html();button.css("min-width",button.width());button.html(this.getLoadingHTML());return this.drawPreRenderedPart("#WORDLIST"+word+" > ."+lang+"_"+kind+" > .examplelist",this.ui[kind+"examplelist"],_.bind(function(){this.changeToExampleList(kind);setTimeout(_.bind(this.updateAllMyToolLinks,this),10);return button.html(old)},this))}},changeToExampleList:function(kind){return this.ui[kind+"list"].addClass("togglesecond")},hideExampleList:function(e){return $(e.srcElement||e.target).closest(".togglebox").removeClass("togglesecond")},updateMission:function(){if(this.word!=="rationalnum"||"green"===CATS.school.getLessonStatus("wordintro")){return this.ui.missionbox.hide()}else{this.ui.missionbox.show();if(CATS.school.getMissionStatus("glossaryword")){return this.ui.missionbox.addClass("togglesecond")}else{return this.ui.missionbox.removeClass("togglesecond")}}}})}).call(this);