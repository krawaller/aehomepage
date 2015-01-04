(function(){var analyse,countleaves,exportTo,helpers,objprint,objprinttable,types,vals;if(typeof require==="function"){helpers=require("./helpers")}else{helpers=this.CATS.app.helpers}types={sv:{root:"rot",power:"potens",product:"prod",sum:"sum",number:"tal","const":"knst",variable:"var",AND:"konj",OR:"disj",fraction:"bråk",relationeq:"=",relationneq:"!=",relationlt:"<",relationleq:"<=",relationgt:">",relationgeq:">=",negation:"neg",NOT:"ej",ifelse:"omså",DIVTEST:"div?",isinteger:"hel?",isprime:"prim?",plusminus:"+-","true":"sant","false":"falskt","void":"?",absolute:"abs",varcount:"varantal",ismonfac:"mfak?",ismonomial:"mon?",ispolynomial:"poly?"},en:{root:"root",power:"pow",product:"prod",sum:"sum",number:"nbr","const":"cnst",variable:"var",AND:"conj",OR:"disj",fraction:"frac",relationeq:"=",relationneq:"!=",relationlt:"<",relationleq:"<=",relationgt:">",relationgeq:">=",negation:"neg",NOT:"not",ifelse:"ifthen",DIVTEST:"div?",isinteger:"int?",isprime:"prime?",plusminus:"+-","true":"true","false":"false","void":"?",absolute:"abs",ismonfac:"mfac?",ismonomial:"mon?",ispolynomial:"poly?"}};vals={sv:{undefined:"odef",percent:"%",e:"e",i:"i",pi:"π"},en:{undefined:"undef",percent:"%",e:"e",i:"i",pi:"π"}};countleaves=function(o){var child,ret,_i,_len,_ref;if(!o.objs){return 1}else{ret=0;_ref=o.objs;for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];ret+=countleaves(child)}return ret}};analyse=function(o,addr,mem){var child,n,rownum,_i,_len,_ref;if(addr==null){addr=[]}if(mem==null){mem={rows:[],depth:0}}rownum=addr.length;if(!mem.rows[rownum]){mem.rows.push([])}mem.rows[rownum].push({obj:o,numleaves:countleaves(o),addr:addr});mem.depth=Math.max(rownum,mem.depth);if(o.objs){_ref=o.objs;for(n=_i=0,_len=_ref.length;_i<_len;n=++_i){child=_ref[n];analyse(child,addr.concat(n),mem)}}return mem};objprinttable=function(arg){var analysis,cell,dataaddr,html,lang,markclass,markpaths,n,o,prepath,row,rownum,rowspan,type,_i,_j,_k,_len,_len1,_ref,_ref1;o=arg.o,prepath=arg.prepath,markpaths=arg.markpaths,lang=arg.lang;analysis=analyse(o);console.log(analysis);html="<table class='structtable'><tbody>";_ref=analysis.rows;for(rownum=_i=0,_len=_ref.length;_i<_len;rownum=++_i){row=_ref[rownum];html+="<tr>";for(_j=0,_len1=row.length;_j<_len1;_j++){cell=row[_j];if(helpers.matchAddress(cell.addr,[],[prepath])){markclass=markpaths.length||true?"markme ":"markpart "}else if(helpers.matchAddress(cell.addr,prepath,markpaths)){markclass="markpart "}else{markclass="ffs "}if(cell.addr.length){for(n=_k=0,_ref1=cell.addr.length;0<=_ref1?_k<_ref1:_k>_ref1;n=0<=_ref1?++_k:--_k){markclass+="group"+cell.addr.slice(0,+n+1||9e9).join("_")+" "}}dataaddr=cell.addr.length+"|"+cell.addr.join("_");rowspan=cell.obj.objs?1:analysis.depth-rownum+1;html+="<td class='"+markclass+" structobj group ' data-addr='"+dataaddr+"' rowspan="+rowspan+" colspan="+cell.numleaves+">";type=cell.obj.objs&&cell.obj.val?cell.obj.type+cell.obj.val:cell.obj.type;html+="<span class='structtype'>"+(types[lang][type]||type)+"</span>";html+="<span class='structtype dummy'>"+(types[lang][type]||type)+"</span>";if(cell.obj.val&&!cell.obj.objs){html+="<span class='structval'>"+(vals[lang][cell.obj.val]||cell.obj.val)+"</span>"}html+="</td>"}html+="</tr>"}html+="</tbody></table>";return html};objprint=function(o,prepath,markpaths,me,child,lang,jedenachka){var isatom,kid,kidpos,kids,markclass,pre,type,val,_i,_len,_ref;if(me==null){me=[]}isatom=!o.hasOwnProperty("objs");console.log("Now we're gonna print ffs.",prepath,markpaths,me,typeof me,lang);if(helpers.matchAddress(me,[],[prepath])){markclass=markpaths.length||true?"markme ":"markpart "}else if(helpers.matchAddress(me,prepath,markpaths)){markclass="markpart "}else{markclass="ffs "}if(jedenachka){markclass+="lonechild "}pre="<span class='"+markclass+(o.root?"root ":"")+"structobj "+o.type+" "+(isatom||"parent")+"' data-addr='"+(me.length+"|"+me.join(","))+"'>";type=o.objs&&o.val?o.type+o.val:o.type;type="<span class='structtype'>"+(types[lang][type]||type)+"</span>";if(!o.objs&&!o.val){o.val="&nbsp;"}val=o.val&&!o.objs?"<span class='structval'>"+(vals[lang][o.val]||o.val)+"</span>":"";kids="";if(o.objs){kids+="<span class='structobjs group'>";_ref=o.objs;for(kidpos=_i=0,_len=_ref.length;_i<_len;kidpos=++_i){kid=_ref[kidpos];kids+=objprint(kid,prepath,markpaths,me.concat([kidpos]),true,lang,o.objs.length===1)}kids+="</span>"}if(child){return pre+type+val+kids+"</span>"}else{return"<span class='objbox group'>"+pre+type+val+kids+"</span></span>"}};if(typeof exports==="undefined"){exportTo=this.CATS.app}else{exportTo=exports}exportTo.objprinter=objprint;exportTo.objprinttable=objprinttable}).call(this);