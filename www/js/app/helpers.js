(function(){var augmentToolTag,effecttotag,exportTo,hasimplicit,hasimplicitadd,hasimplicitlogbase,hasimplicitmult,hasimplicitrootbase,icon,implicitadd,implicitmult,imply,k,langAgnosticAtom,langAgnosticMolecule,matchAddress,needsparens,setupTemplate,test,txticon,typeset,v,_ref;effecttotag={simplifying:"simplifying",complicating:"complicating",condsimpl:"conditionallysimplify",integrity:"integritycheck",decimalifying:"decimalifying",rephrasing:"rephrasing"};imply={solve:["equation"],equation:["solve","relation","equality"],comparison:["relation"],forbiddenequality:["relation"],logictrue:["boolean"],logicfalse:["boolean"]};implicitadd=function(t1,t2,str){var _ref;return t2.type==="negation"||t2.type==="plusminus"&&!str||t2.type==="product"&&((_ref=t2.objs[0].type)==="negation"||_ref==="plusminus")};implicitmult=function(f1,f2,str){var f2isnum,_ref,_ref1,_ref2,_ref3;if((_ref=f2.type)==="negation"||_ref==="plusminus"||_ref==="fraction"||_ref==="absolute"){return false}else if((_ref1=f1.type)==="log"||_ref1==="fraction"||_ref1==="absolute"){return false}else{f2isnum=f2.type==="number"||f2.type==="negation"&&f2.objs[0].type==="number";if(f2isnum){return false}else if(f2.type==="power"&&((_ref2=f2.objs[0].type)==="negation"||_ref2==="number")){return false}else{if(((_ref3=f2.type)==="log"||_ref3==="root")&&str){return false}else{return true}}}};hasimplicitadd=function(o){var child,fac,n,_i,_j,_len,_len1,_ref,_ref1;if(o.type==="sum"){_ref=o.objs;for(n=_i=0,_len=_ref.length;_i<_len;n=++_i){fac=_ref[n];if(n<=o.objs.length-2){if(implicitadd(fac,o.objs[n+1])){return true}}}}else{_ref1=o.objs||[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){child=_ref1[_j];if(hasimplicitadd(child)){return true}}return false}};hasimplicitmult=function(o){var child,fac,n,_i,_j,_len,_len1,_ref,_ref1;if(o.type==="product"){_ref=o.objs;for(n=_i=0,_len=_ref.length;_i<_len;n=++_i){fac=_ref[n];if(n<=o.objs.length-2){if(implicitmult(fac,o.objs[n+1])){return true}}}}else{_ref1=o.objs||[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){child=_ref1[_j];if(hasimplicitmult(child)){return true}}return false}};hasimplicitlogbase=function(o){var base,child,_i,_len,_ref;if(o.type==="log"){base=o.objs[1];if(base.type==="number"&&base.val==="10"||base.type==="const"&&base.val==="e"){return true}}else{_ref=o.objs||[];for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];if(hasimplicitlogbase(child)){return true}}return false}};hasimplicitrootbase=function(o){var child,_i,_len,_ref;if(o.type==="root"&&o.objs[1].type==="number"&&o.objs[1].val==="2"){return true}else{_ref=o.objs||[];for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];if(hasimplicitrootbase(child)){return true}}return false}};hasimplicit=function(o){return hasimplicitmult(o)||hasimplicitlogbase(o)||hasimplicitrootbase(o)||hasimplicitadd(o)};augmentToolTag=function(tooldef,tools){var arr,effect,implier,newtag,t,tag,tags,_i,_len,_ref;if(tooldef.info&&tooldef.info.tags){tags=tooldef.info.tags;effect=tooldef.info.effect;tag=effecttotag[effect];if(!tag){throw"What the eff effect is this?! "+effect+" ("+tooldef.info.name+")"}if(tags.indexOf(tag)===-1){tags.push(tag)}for(implier in imply){arr=imply[implier];if(tags.indexOf(implier)!==-1){for(_i=0,_len=arr.length;_i<_len;_i++){newtag=arr[_i];if(tags.indexOf(newtag)===-1){tags.push(newtag)}}}}if((_ref=tooldef.info.uses)!=null?_ref.length:void 0){if(function(){var _j,_len1,_ref1,_results;_ref1=tooldef.info.uses;_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){t=_ref1[_j];if(tools[t].info.effect==="simplifying"){_results.push(t)}}return _results}().length===tooldef.info.uses.length){tags.push("collection")}}}return tooldef};test=function(addr,path){if(path==null){path=[]}return"ID"+addr.toString()==="ID"+path.toString()};setupTemplate=function(templatesel,localizeid){var lang,templ,text,textid,ui;templ=$(templatesel);ui=CATS.texts.ui[localizeid];lang=CATS.settings.lang;for(textid in ui){text=ui[textid][lang];console.log("SETUPTEMPLATE",templatesel,localizeid,textid,text,templ.find("."+textid).length);templ.find("."+textid).html(text)}return templ.html()};langAgnosticAtom=function(o){var _ref;if((_ref=o.type)==="NOT"||_ref==="AND"||_ref==="OR"||_ref==="DIVTEST"||_ref==="true"||_ref==="false"||_ref==="ifelse"||_ref==="isinteger"||_ref==="varcount"||_ref==="ismonfac"||_ref==="ismonomial"||_ref==="ispolynomial"||o.type==="const"&&o.val==="undefined"){return false}else{return true}};langAgnosticMolecule=function(o){var child,_i,_len,_ref;if(!langAgnosticAtom(o)){return false}else{_ref=o.objs||[];for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];if(!langAgnosticMolecule(child)){return false}}}return true};needsparens=function(o,parenttype,position,outof,tostr){var mytype,_ref,_ref1,_ref2,_ref3,_ref4,_ref5;mytype=o.type;if(!parenttype){return false}if(mytype==="ifelse"){return true}switch(parenttype){case"log":return position===0&&((_ref=o.objs)!=null?_ref.length:void 0)>1&&!(mytype==="fraction"||mytype==="power")||tostr&&((_ref1=o.objs)!=null?_ref1.length:void 0)>1;case"sum":return mytype==="sum";case"product":return mytype==="product"||mytype==="sum"||mytype==="log"&&position<outof-1||tostr&&mytype==="fraction";case"XOR":case"NOT":return((_ref2=o.objs)!=null?_ref2.length:void 0)>1;case"AND":case"OR":return mytype==="AND"||mytype==="OR";case"fraction":return mytype==="fraction"||tostr&&o.objs;case"ifelse":return mytype==="AND"||mytype==="OR"||mytype==="ifelse";case"negation":case"plusminus":if(mytype==="log"){return false}else{return o.objs&&(tostr||o.objs.length>1&&!(mytype==="fraction"||mytype==="root"))}break;case"power":return position!==1&&(mytype==="product"||mytype==="sum"||mytype==="power"||mytype==="fraction"||mytype==="negation"&&position===0)||tostr&&((_ref3=o.objs)!=null?_ref3.length:void 0)>1;case"integertest":return false;case"varcount":return mytype==="relation";case"isprime":return tostr;case"root":return tostr&&((_ref4=o.objs)!=null?_ref4.length:void 0)>1;case"absolute":return tostr&&((_ref5=o.objs)!=null?_ref5.length:void 0)>1;case"relation":return tostr&&(mytype==="relation"||mytype==="AND"||mytype==="OR");default:return false}};matchAddress=function(addr,pre,paths){var path,_i,_len;if(pre==null){pre=[]}if(paths==null){paths=[]}if(pre.length===0||test(addr.slice(0,+(pre.length-1)+1||9e9),pre)){addr=addr.slice(pre.length);for(_i=0,_len=paths.length;_i<_len;_i++){path=paths[_i];if(test(addr,path)){return true}}}return false};icon=function(iconname,white){return"<span class='glyphicons "+(white?"white ":"")+iconname+"'></span>"};txticon=function(iconname){var map,txt;map={glass:"E001",leaf:"E002",dog:"1F415",user:"E004",girl:"1F467",car:"E006",user_add:"E007",user_remove:"E008",film:"E009",magic:"E010",envelope:"2709",camera:"1F4F7",heart:"E013",beach_umbrella:"E014",train:"1F686",print:"E016",bin:"E017",music:"E018",note:"E019",heart_empty:"E020",home:"E021",snowflake:"2744",fire:"1F525",magnet:"E024",parents:"E025",binoculars:"E026",road:"E027",search:"E028",cars:"E029",notes_2:"E030",pencil:"270F",bus:"1F68C",wifi_alt:"E033",luggage:"E034",old_man:"E035",woman:"1F469",file:"E037",coins:"E038",airplane:"2708",notes:"E040",stats:"E041",charts:"E042",pie_chart:"E043",group:"E044",keys:"E045",calendar:"1F4C5",router:"E047",camera_small:"E048",dislikes:"E049",star:"E050",link:"E051",eye_open:"E052",eye_close:"E053",alarm:"E054",clock:"E055",stopwatch:"E056",projector:"E057",history:"E058",truck:"E059",cargo:"E060",compass:"E061",keynote:"E062",paperclip:"1F4CE",power:"E064",lightbulb:"E065",tag:"E066",tags:"E067",cleaning:"E068",ruller:"E069",gift:"E070",umbrella:"2602",book:"E072",bookmark:"1F516",wifi:"E074",cup:"E075",stroller:"E076",headphones:"E077",headset:"E078",warning_sign:"E079",signal:"E080",retweet:"E081",refresh:"E082",roundabout:"E083",random:"E084",heat:"E085",repeat:"E086",display:"E087",log_book:"E088",address_book:"E089",building:"E090",eyedropper:"E091",adjust:"E092",tint:"E093",crop:"E094",vector_path_square:"E095",vector_path_circle:"E096",vector_path_polygon:"E097",vector_path_line:"E098",vector_path_curve:"E099",vector_path_all:"E100",font:"E101",italic:"E102",bold:"E103",text_underline:"E104",text_strike:"E105",text_height:"E106",text_width:"E107",text_resize:"E108",left_indent:"E109",right_indent:"E110",align_left:"E111",align_center:"E112",align_right:"E113",justify:"E114",list:"E115",text_smaller:"E116",text_bigger:"E117",embed:"E118",embed_close:"E119",table:"E120",message_full:"E121",message_empty:"E122",message_in:"E123",message_out:"E124",message_plus:"E125",message_minus:"E126",message_ban:"E127",message_flag:"E128",message_lock:"E129",message_new:"E130",inbox:"E131",inbox_plus:"E132",inbox_minus:"E133",inbox_lock:"E134",inbox_in:"E135",inbox_out:"E136",cogwheel:"E137",cogwheels:"E138",picture:"E139",adjust_alt:"E140",database_lock:"E141",database_plus:"E142",database_minus:"E143",database_ban:"E144",folder_open:"E145",folder_plus:"E146",folder_minus:"E147",folder_lock:"E148",folder_flag:"E149",folder_new:"E150",edit:"E151",new_window:"E152",check:"E153",unchecked:"E154",more_windows:"E155",show_big_thumbnails:"E156",show_thumbnails:"E157",show_thumbnails_with_lines:"E158",show_lines:"E159",playlist:"E160",imac:"E161",macbook:"E162",ipad:"E163",iphone:"E164",iphone_transfer:"E165",iphone_exchange:"E166",ipod:"E167",ipod_shuffle:"E168",ear_plugs:"E169",record:"E170",step_backward:"E171",fast_backward:"E172",rewind:"E173",play:"E174",pause:"E175",stop:"E176",forward:"E177",fast_forward:"E178",step_forward:"E179",eject:"E180",facetime_video:"E181",download_alt:"E182",mute:"E183",volume_down:"E184",volume_up:"E185",screenshot:"E186",move:"E187",more:"E188",brightness_reduce:"E189",brightness_increase:"E190",circle_plus:"E191",circle_minus:"E192",circle_remove:"E193",circle_ok:"E194",circle_question_mark:"E195",circle_info:"E196",circle_exclamation_mark:"E197",remove:"E198",ok:"E199",ban:"E200",download:"E201",upload:"E202",shopping_cart:"E203",lock:"1F512",unlock:"E205",electricity:"E206",ok_2:"E207",remove_2:"E208",cart_out:"E209",cart_in:"E210",left_arrow:"E211",right_arrow:"E212",down_arrow:"E213",up_arrow:"E214",resize_small:"E215",resize_full:"E216",circle_arrow_left:"E217",circle_arrow_right:"E218",circle_arrow_top:"E219",circle_arrow_down:"E220",play_button:"E221",unshare:"E222",share:"E223","chevron-right":"E224","chevron-left":"E225",bluetooth:"E226",euro:"20AC",usd:"E228",gbp:"E229",retweet_2:"E230",moon:"E231",sun:"2609",cloud:"2601",direction:"E234",brush:"E235",pen:"E236",zoom_in:"E237",zoom_out:"E238",pin:"E239",albums:"E240",rotation_lock:"E241",flash:"E242",google_maps:"E243",anchor:"2693",conversation:"E245",chat:"E246",male:"E247",female:"E248",asterisk:"002A",divide:"00F7",snorkel_diving:"E251",scuba_diving:"E252",oxygen_bottle:"E253",fins:"E254",fishes:"E255",boat:"E256","delete":"E257",sheriffs_star:"E258",qrcode:"E259",barcode:"E260",pool:"E261",buoy:"E262",spade:"E263",bank:"1F3E6",vcard:"E265",electrical_plug:"E266",flag:"E267",credit_card:"E268","keyboard-wireless":"E269","keyboard-wired":"E270",shield:"E271",ring:"02DA",cake:"E273",drink:"E274",beer:"E275",fast_food:"E276",cutlery:"E277",pizza:"E278",birthday_cake:"E279",tablet:"E280",settings:"E281",bullets:"E282",cardio:"E283","t-shirt":"E284",pants:"E285",sweater:"E286",fabric:"E287",leather:"E288",scissors:"E289",bomb:"1F4A3",skull:"1F480",celebration:"E292",tea_kettle:"E293",french_press:"E294",coffe_cup:"E295",pot:"E296",grater:"E297",kettle:"E298",hospital:"1F3E5",hospital_h:"E300",microphone:"1F3A4",webcam:"E302",temple_christianity_church:"E303",temple_islam:"E304",temple_hindu:"E305",temple_buddhist:"E306",bicycle:"1F6B2",life_preserver:"E308",share_alt:"E309",comments:"E310",flower:"2698",baseball:"26BE",rugby:"E313",ax:"E314",table_tennis:"E315",bowling:"1F3B3",tree_conifer:"E317",tree_deciduous:"E318",more_items:"E319",sort:"E320",filter:"E321",gamepad:"E322",playing_dices:"E323",calculator:"E324",tie:"E325",wallet:"E326",piano:"E327",sampler:"E328",podium:"E329",soccer_ball:"E330",blog:"E331",dashboard:"E332",certificate:"E333",bell:"1F514",candle:"E335",pushpin:"1F4CC",iphone_shake:"E337",pin_flag:"E338",turtle:"1F422",rabbit:"1F407",globe:"E341",briefcase:"1F4BC",hdd:"E343",thumbs_up:"E344",thumbs_down:"E345",hand_right:"E346",hand_left:"E347",hand_up:"E348",hand_down:"E349",fullscreen:"E350",shopping_bag:"E351",book_open:"E352",nameplate:"E353",nameplate_alt:"E354",vases:"E355",bullhorn:"E356",dumbbell:"E357",suitcase:"E358",file_import:"E359",file_export:"E360",bug:"1F41B",crown:"1F451",smoking:"E363","cloud-upload":"E364","cloud-download":"E365",restart:"E366",security_camera:"E367",expand:"E368",collapse:"E369",collapse_top:"E370",globe_af:"E371",global:"E372",spray:"E373",nails:"E374",claw_hammer:"E375",classic_hammer:"E376",hand_saw:"E377",riflescope:"E378",electrical_socket_eu:"E379",electrical_socket_us:"E380",message_forward:"E381",coat_hanger:"E382",dress:"1F457",bathrobe:"E384",shirt:"E385",underwear:"E386",log_in:"E387",log_out:"E388",exit:"E389",new_window_alt:"E390",video_sd:"E391",video_hd:"E392",subtitles:"E393",sound_stereo:"E394",sound_dolby:"E395",sound_5_1:"E396",sound_6_1:"E397",sound_7_1:"E398",copyright_mark:"E399",registration_mark:"E400",radar:"E401",skateboard:"E402",golf_course:"E403",sorting:"E404","sort-by-alphabet":"E405","sort-by-alphabet-alt":"E406","sort-by-order":"E407","sort-by-order-alt":"E408","sort-by-attributes":"E409","sort-by-attributes-alt":"E410",compressed:"E411","package":"1F4E6",cloud_plus:"E413",cloud_minus:"E414",disk_save:"E415",disk_open:"E416",disk_saved:"E417",disk_remove:"E418",disk_import:"E419",disk_export:"E420",tower:"E421",send:"E422",git_branch:"E423",git_create:"E424",git_private:"E425",git_delete:"E426",git_merge:"E427",git_pull_request:"E428",git_compare:"E429",git_commit:"E430",construction_cone:"E431",shoe_steps:"E432",plus:"002B",minus:"2212",redo:"E435",undo:"E436",golf:"E437",hockey:"E438",pipe:"E439",wrench:"1F527",folder_closed:"E441",phone_alt:"E442",earphone:"E443",floppy_disk:"E444",floppy_saved:"E445",floppy_remove:"E446",floppy_save:"E447",floppy_open:"E448",translate:"E449",fax:"E450",factory:"1F3ED",shop_window:"E452",shop:"E453",kiosk:"E454",kiosk_wheels:"E455",kiosk_light:"E456",kiosk_food:"E457",transfer:"E458",money:"E459",header:"E460",blacksmith:"E461",saw_blade:"E462",basketball:"E463",server:"E464",server_plus:"E465",server_minus:"E466",server_ban:"E467",server_flag:"E468",server_lock:"E469",server_new:"E470"};txt="&#"+parseInt("0x"+map[iconname])+";";return"<span class='txticon txt"+iconname+"'>"+txt+"</span>"};typeset=function(el,callback){if(!el){throw"WHAT THE HECK, TYPESETTING EMPTY ELEMENT!!"}if(el.jquery){el=el.get(0)}console.log("TYPESETTING ",this.me,el,CATS.settings.rendermode);if(CATS.settings.rendermode==="mathjax"){return MathJax.Hub.Queue(["Typeset",MathJax.Hub,el,callback||function(){}])}else if(callback){return callback()}};if(typeof exports==="undefined"){exportTo=this.CATS.app.helpers}else{exportTo=exports}_ref={hasimplicit:hasimplicit,implicitmult:implicitmult,implicitadd:implicitadd,augmentToolTag:augmentToolTag,setupTemplate:setupTemplate,langAgnosticAtom:langAgnosticAtom,langAgnosticMolecule:langAgnosticMolecule,typeset:typeset,matchAddress:matchAddress,needsparens:needsparens,icon:icon,txticon:txticon};for(k in _ref){v=_ref[k];exportTo[k]=v}}).call(this);