(function(){CATS.bb.InfoItemView=CATS.bb.BaseView.extend({template:$("#infoitemviewtemplate").html(),localizeid:"infoitem",category:"info",className:"infoitem viewbox",events:{"click .killstacktabbutton":"killMeFromRoot"},noprocess:true,render:function(){this.localize();return this},renderItem:function(){this.hasrendereditem=true;this.setContent(this.template,true);this.setUI("infoitemheadline","infoitemholder");return this},showItem:function(word){var def,lang;if(!this.hasrendereditem){this.renderItem()}def=CATS.texts.info[word];lang=CATS.settings.lang;this.setTitle(["info",word,"headline",lang],false,true);return this.ui.infoitemholder.html(this.getText(["info",word,"description",lang],false,false,true))}})}).call(this);