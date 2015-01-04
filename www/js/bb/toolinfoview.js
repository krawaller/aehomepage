(function(){var __indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};CATS.bb.ToolinfoView=CATS.bb.BaseView.extend({tagName:"div",className:"toolinfo viewbox",category:"tool",localizeid:"toolinfo",events:{"click .buttonexample":"showExample","click .explanationbutton":"explanationSection","click .linkbutton":"linkSection","click .coursebutton":"schoolSection","click .learnbutton":"learnTool","click .forgetbutton":"maybeForgetTool","click .forgetconfirmbutton":"forgetTool","click .killstacktabbutton":"killMeFromRoot"},learnTool:function(){CATS.school.learnTool(this.toolname);return this.updateSchool(this.toolname)},maybeForgetTool:function(){var deps;console.log("Before dep count",this.toolname);deps=CATS.school.countDeps(this.toolname);console.log("Ok, dep count for",this.toolname,"was",deps);if(!deps){return this.forgetTool()}else{this.ui.forgetconfirmbuttontext.html(this.getText(["ui","toolinfo","confirmforget"+(deps===1?"single":"multi"),CATS.settings.lang],true,false,true).replace("%NUM",CATS.texts.numberStr(deps,CATS.settings.lang)));this.$el.addClass("confirm");return this.timer=setTimeout(_.bind(function(){return this.$el.removeClass("confirm")},this),4e3)}},forgetTool:function(){CATS.school.forgetTool(this.toolname);this.updateSchool(this.toolname);delete this.timer;return this.$el.removeClass("confirm")},helpsection:function(){return this.help||"explanation"},explanationSection:function(e){this.help="explanation";this.$el.removeClass("linksection schoolsection").addClass("explanationsection");this.ui.coursebutton.removeClass("active");this.ui.linkbutton.removeClass("active");this.ui.explanationbutton.addClass("active");return this.updateHelpLink()},linkSection:function(e){this.help="links";this.$el.removeClass("explanationsection schoolsection").addClass("linksection");this.ui.coursebutton.removeClass("active");this.ui.explanationbutton.removeClass("active");this.ui.linkbutton.addClass("active");return this.updateHelpLink()},schoolSection:function(e){this.help="school";this.$el.removeClass("explanationsection linksection").addClass("schoolsection");this.ui.linkbutton.removeClass("active");this.ui.explanationbutton.removeClass("active");this.ui.coursebutton.addClass("active");return this.updateHelpLink()},render:function(){this.lessonLinkAware();this.toolLinkAware();this.listenTo(Backbone,"updatelesson",this.updateLesson);return this},renderItem:function(){this.hasrendereditem=true;this.setContent(CATS.cache.templates["#toolinfoviewtemplate"]);this.setUI("forgetconfirmbuttontext","nolesson","lessonbox","lessoninstructiontext","lessontrafficlight","operationtrafficlight","usesxinfo","nameparagraph","tuses","tusedby","beforecontainer","aftercontainer","associatedwordslist","linkbutton","explanationbutton","lessonlinkholder","instructiontext","lessonheadline","coursebutton","oppositebox","oppositelink");this.setUI("learnopmissionbox","listexception","usedbyinfo","usedbynoneinfo","usedbysingleinfo","usesinfo","usesnoneinfo","collectioninfo","usesnothinginfo","buttonexample");return this},updateMission:function(){if(this.toolname!=="mergePosNumTerms"||"green"===CATS.school.getLessonStatus("learnop")||"green"!==CATS.school.getToolStatus("mergePosNumTerms")){return this.ui.learnopmissionbox.hide()}else{this.ui.learnopmissionbox.show();if(CATS.school.getMissionStatus("learnop")){return this.ui.learnopmissionbox.addClass("togglesecond")}else{return this.ui.learnopmissionbox.removeClass("togglesecond")}}},showItem:function(toolname){var def,exceptions,l,lang,line,list,tname,word,_i,_j,_len,_len1,_ref,_ref1,_ref2,_ref3;lang=CATS.settings.lang;if(!this.hasrendereditem){this.renderItem()}this.toolname=toolname;this.def=def=CATS.math[toolname];this.drawPreRenderedPart("#EXAMPLE"+toolname+" > ."+lang+" > :nth-child(1)",this.ui.beforecontainer);this.drawPreRenderedPart("#EXAMPLE"+toolname+" > ."+lang+" > :nth-child(2)",this.ui.aftercontainer);this.explanationSection();_ref=["targets","returns","effect","explanation"];for(_i=0,_len=_ref.length;_i<_len;_i++){line=_ref[_i];this.setText("."+line+"paragraph",["tools",toolname,CATS.settings.lang,line],false,false,true)}this.ui.listexception.hide();if(def.info.uses){exceptions=def.info.circle||[];this.ui.tuses.html("<div class='davidlist'>"+function(){var _j,_len1,_ref1,_results;_ref1=def.info.uses;_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){tname=_ref1[_j];_results.push(this.toolLink(tname,void 0,void 0,void 0,exceptions.indexOf(tname)!==-1))}return _results}.call(this).join("")+"</div>");this.ui.usesxinfo.show().html(this.ui.usesxinfo.html().replace("%NUM",CATS.texts.numberStr(def.info.uses.length,lang)));this.ui.usesinfo.show().html(this.ui.usesinfo.html().replace("%NUM",CATS.texts.numberStr(def.info.uses.length,lang)));this.ui.usesnoneinfo.hide();this.ui.usesnothinginfo.hide();if(def.info.circle){this.ui.listexception.show()}}else{this.ui.tuses.empty();this.ui.usesinfo.hide();this.ui.usesxinfo.hide();this.ui.usesnoneinfo.show();this.ui.usesnothinginfo.show()}if((_ref1=def.info.usedby)!=null?_ref1.length:void 0){this.ui.tusedby.html("<div class='davidlist'>"+function(){var _j,_len1,_ref2,_results;_ref2=def.info.usedby;_results=[];for(_j=0,_len1=_ref2.length;_j<_len1;_j++){tname=_ref2[_j];_results.push(this.toolLink(tname))}return _results}.call(this).join("")+"</div>");this.ui.usedbynoneinfo.hide();if(def.info.usedby.length===1){this.ui.usedbyinfo.hide()}else{this.ui.usedbysingleinfo.hide();this.ui.usedbyinfo.show().html(this.ui.usedbyinfo.html().replace("%NUM",CATS.texts.numberStr(def.info.usedby.length,lang)))}}else{this.ui.tusedby.empty();this.ui.usedbyinfo.hide();this.ui.usedbysingleinfo.hide();this.ui.usedbynoneinfo.show()}if(function(){var _j,_len1,_ref2,_results;_ref2=def.info.tags||[];_results=[];for(_j=0,_len1=_ref2.length;_j<_len1;_j++){l=_ref2[_j];if(l==="collection"){_results.push(l)}}return _results}().length){this.ui.collectioninfo.show()}else{this.ui.collectioninfo.hide()}if(def.info.lesson){this.ui.lessonlinkholder.html(this.lessonLink(def.info.lesson));this.ui.nolesson.hide()}else{this.ui.lessonlinkholder.hide();this.ui.lessonbox.hide();this.ui.nolesson.show()}if(def.info.opposite){this.ui.oppositelink.append(this.toolLink(def.info.opposite))}else{this.ui.oppositebox.hide()}if(!def.info.uses){this.ui.buttonexample.hide()}_ref2=def.info.tags;for(_j=0,_len1=_ref2.length;_j<_len1;_j++){word=_ref2[_j];if(!((_ref3=CATS.texts.links[word])!=null?_ref3.headline:void 0)){throw"MISSING LINK "+def.info.name+" ---- "+word}}list=function(){var _k,_len2,_ref4,_ref5,_results;_ref4=def.info.tags;_results=[];for(_k=0,_len2=_ref4.length;_k<_len2;_k++){word=_ref4[_k];if((_ref5=CATS.texts.links[word])!=null?_ref5.description[lang]:void 0){_results.push(this.wordLink(word))}}return _results}.call(this);this.ui.associatedwordslist.html(list.join(""));this.ui.associatedwordslist.append(this.reportLink("optaglist",toolname+": "+def.info.tags.join(", ")));console.log("--- Showing tool ---",toolname);CATS.school.maybeYellowLightTool(toolname);this.updateSchool(toolname);this.listenTo(Backbone,"learnedtool",this.maybeUpdateSchool);this.listenTo(Backbone,"forgottool",this.maybeUpdateSchool);this.listenTo(Backbone,"losttouchoftool",this.maybeUpdateSchool);this.listenTo(Backbone,"qualifiedtool",this.maybeUpdateSchool);this.listenTo(Backbone,"updatelesson",this.updateMission);this.listenTo(Backbone,"updatemission",this.updateMission);return this},maybeUpdateSchool:function(toolname){if(this.toolname===toolname||__indexOf.call(this.def.info.uses||[],toolname)>=0){return this.updateSchool(this.toolname)}},updateSchool:function(toolname){var colour,def,lang,remains,str,tname,total,_ref;colour=CATS.school.getToolStatus(toolname);lang=CATS.settings.lang;def=CATS.math[this.toolname];this.$el.removeClass("toolinfored toolinfoyellow toolinfogreen");this.$el.addClass("toolinfo"+colour);this.setTitle(this.toolLink(toolname,lang,true)+this.reportLink("text",[toolname,name,lang].join("-")));str="learninstruction"+colour+(def.info.uses?"complex":"basic");if(def.info.circle){str+="circle"}total=((_ref=def.info.uses)!=null?_ref.length:void 0)||0;if(def.info.uses){str+=total===2?2:3;remains=function(){var _i,_len,_ref1,_results;_ref1=def.info.uses;_results=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){tname=_ref1[_i];if("green"!==CATS.school.getToolStatus(tname)){_results.push(666)}}return _results}().length;if(colour==="red"){if(remains===total){str+="none"}else if(total>2&&remains===1){str+="oneleft"}}}this.ui.instructiontext.html(this.getText(["ui","toolinfo",str,lang],false,false,true));if(def.info.uses){this.ui.instructiontext.html(this.ui.instructiontext.html().replace("%TOTAL",CATS.texts.numberStr(total,lang)));this.ui.instructiontext.html(this.ui.instructiontext.html().replace("%REMAINS",CATS.texts.numberStr(remains,lang)));this.ui.instructiontext.html(this.ui.instructiontext.html().replace("%LEARNED",CATS.texts.numberStr(total-remains,lang)))}this.ui.operationtrafficlight.removeClass("trafficred trafficyellow trafficgreen").addClass("traffic"+colour);this.updateLesson(this.def.info.lesson);return this.updateMission()},updateLesson:function(lesson){var colour,lang,left,lessoncolour,numopsinlesson,str;if(this.def.info.lesson&&this.def.info.lesson===lesson){colour=CATS.school.getToolStatus(this.toolname);lang=CATS.settings.lang;lessoncolour=CATS.school.getLessonStatus(this.def.info.lesson);this.ui.lessontrafficlight.removeClass("trafficred trafficyellow trafficgreen").addClass("traffic"+lessoncolour);left=CATS.school.remainingOpsInLesson(this.def.info.lesson);numopsinlesson=CATS.school.getNbrOpsInLesson(this.def.info.lesson);str="lesson"+lessoncolour+(lessoncolour==="red"?Math.min(colour==="green"?2:3,left)+(colour==="green"?"yes":"no"):"");if(lessoncolour==="yellow"&&numopsinlesson===2){str+="2"}this.ui.lessoninstructiontext.html(this.getText(["ui","toolinfo",str,lang],false,false,true));this.ui.lessoninstructiontext.html(this.ui.lessoninstructiontext.html().replace("%NUM",CATS.texts.numberStr(left,lang)));return this.ui.lessoninstructiontext.html(this.ui.lessoninstructiontext.html().replace("%TOTAL",CATS.texts.numberStr(numopsinlesson,lang)))}else{return console.log("Pooo, det var fel lektion",lesson,"jag vill ha",this.def.info.lesson,"och jag är",this.toolname)}},showExample:function(){var carrier,exampleinput,step;if(!this.def.info){console.log("WTF exempel utan info?!",this.toolname,this.def)}exampleinput=CATS.math.exampleInput(this.def.info.example);carrier=new CATS.math.Carrier({target:exampleinput.target});carrier["do"](this.toolname,"example",exampleinput);step=carrier.steps[0];step.because="toolexample";return this.$el.trigger("showcalcresult",{result:step})}})}).call(this);