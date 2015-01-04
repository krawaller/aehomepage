(function(){CATS.bb.InfoTabView=CATS.bb.BaseView.extend({tagName:"div",localizeid:"infotab",category:"info",className:"viewbox",noprocess:true,events:{"click .textreportmodeonbutton":"toggleTextReport","click .textreportmodeoffbutton":"toggleTextReport","click .hidehelpbutton":"toggleHideHelpMode","click .showhelpbutton":"toggleHideHelpMode"},toggleTextReport:function(){CATS.settings.textreportmode=CATS.settings.textreportmode==="yes"?"no":"yes";return Backbone.trigger("settextreportmode")},toggleHideHelpMode:function(){CATS.settings.hidehelpmode=CATS.settings.hidehelpmode==="yes"?"no":"yes";return Backbone.trigger("sethidehelpmode")},initialize:function(o){this.listenTo(Backbone,"forgottool",this.updateStatus);this.listenTo(Backbone,"learnedtool",this.updateStatus);this.listenTo(Backbone,"updatelesson",this.updateStatus);this.constructor.__super__.initialize.apply(this,[o]);return this.localizeid="infotab"},render:function(){var help,info;this.setTitle("infotabheadline",true);this.setContent(CATS.cache.templates["#infotabviewtemplate"]);this.setUI("infolist","versioncontent","helpitemlist","feedbacksection","statuscontent","prisonwarning");this.ui.infolist.html(function(){var _results;_results=[];for(info in CATS.texts.info){_results.push(this.infoLink(info))}return _results}.call(this).join(""));this.ui.helpitemlist.html(function(){var _results;_results=[];for(help in CATS.texts.help){if(!(help==="infoitemview"||help==="helpitemview")){_results.push(this.helpLink(help))}}return _results}.call(this).join(""));if(CATS.settings.krim){this.ui.feedbacksection.hide()}else{this.ui.prisonwarning.hide()}this.updateContent();this.updateStatus();return this},updateContent:function(){var lang;lang=CATS.settings.lang;this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%VERSION",CATS.texts.latestversion));this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%PRISON",CATS.settings.krim?CATS.texts.ui.infotab.prisonversion[lang]:""));this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%AMOUNT",CATS.texts.count.ops-2));this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%GLOSSARY",CATS.texts.count.words-1));this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%LESSONS",CATS.texts.count.lessons));this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%WORDS",CATS.texts.count[lang].total));this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%TYPES",CATS.texts.count.types));return this.ui.versioncontent.html(this.ui.versioncontent.html().replace("%DEMOS",CATS.texts.count.demos))},updateStatus:function(){var learnedlessons,learnedops,word;learnedops=CATS.school.numberOfLearnedOps();learnedlessons=CATS.school.numberOfLearnedLessons();word=["none","one","many"];this.ui.statuscontent.setText("statuscontent"+word[Math.min(learnedlessons,2)]+word[Math.min(learnedops,2)]);this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%LEARNEDOPS",learnedops));return this.ui.statuscontent.html(this.ui.statuscontent.html().replace("%FINISHEDLESSONS",learnedlessons))}})}).call(this);