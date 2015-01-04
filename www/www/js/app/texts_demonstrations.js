(function(){var demonstrations,exportTo;demonstrations={additioncommutativity:{formula:"a+b=b+a",numeric:"1+2=2+1",steps:{addleft:{tool:"addition",input:{aim:[0]}},addright:{tool:"addition",input:{aim:[1]}}}},multiplicationcommutativity:{formula:"ab=ba",numeric:"3*4=4*3",steps:{multleft:{tool:"multiplication",input:{aim:[0]}},multright:{tool:"multiplication",input:{aim:[1]}}}},divisionnotcommutative:{formula:"a/b!=c/d",numeric:"10/2!=2/10",steps:{divleft:{tool:"eliminateCommonInnerFacsInFrac",input:{aim:[0],argument:{type:"number",val:"2"},choices:["self","self"],selection:[[0],[0]]}},divright:{tool:"fracToDecNum",input:{aim:[1]}}}},exponentiationnotcomm:{formula:"a^b!=b^a",numeric:"2^3!=3^2",steps:{expleft:{tool:"numericPowToNum",input:{aim:[0]}},expright:{tool:"numericPowToNum",input:{aim:[1]}}}},distributionleft:{formula:"(a*(b+c))=ab+ac",numeric:"2*(3+4)=2*3+2*4",steps:{addleft:{tool:"addition",input:{aim:[0,1]}},multleft:{tool:"multiplication",input:{aim:[0]}},multrightfirst:{tool:"multiplication",input:{aim:[1,0]}},multrightsecond:{tool:"multiplication",input:{aim:[1,1]}},addright:{tool:"addition",input:{aim:[1]}}}},additionassociativity:{formula:"(a+b)+c=a+(b+c)",numeric:"(1+2)+3=1+(2+3)",steps:{addleftinner:{tool:"addition",input:{aim:[0,0]}},addlefttotal:{tool:"addition",input:{aim:[0]}},addrightinner:{tool:"addition",input:{aim:[1,1]}},addrighttotal:{tool:"addition",input:{aim:[1]}}}},multiplicationassociativity:{formula:"(a*b)*c=a*(b*c)",numeric:"(2*3)*4=2*(3*4)",steps:{multleftinner:{tool:"multiplication",input:{aim:[0,0]}},multlefttotal:{tool:"multiplication",input:{aim:[0]}},multrightinner:{tool:"multiplication",input:{aim:[1,1]}},multrighttotal:{tool:"multiplication",input:{aim:[1]}}}},distributionfraction:{formula:"(a+b)/c = a/c+b/c",numeric:"(3+5)/4 = 3/4+5/4",steps:{addleftnumer:{tool:"addition",input:{aim:[0,0]}},divleft:{tool:"fracToDecNum",input:{aim:[0]}},divrightfirst:{tool:"fracToDecNum",input:{aim:[1,0]}},divrightsecond:{tool:"fracToDecNum",input:{aim:[1,1]}},addright:{tool:"addition",input:{aim:[1]}}}},distributionexponent:{formula:"(a*b)^c = a^c*b^c",numeric:"(4*3)^2 = 4^2*3^2",steps:{multleftbase:{tool:"multiplication",input:{aim:[0,0]}},expleft:{tool:"numericPowToNum",input:{aim:[0]}},exprightfirst:{tool:"numericPowToNum",input:{aim:[1,0]}},exprightsecond:{tool:"numericPowToNum",input:{aim:[1,1]}},multright:{tool:"multiplication",input:{aim:[1]}}}},distributionexponentdiv:{formula:"(a/b)^c = a^c/b^c",numeric:"(4/2)^3 = 4^3/2^3",steps:{divleftbase:{tool:"eliminateCommonInnerFacsInFrac",input:{aim:[0,0],argument:{type:"number",val:"2"},choices:["self","self"],selection:[[0],[0]]}},expleft:{tool:"numericPowToNum",input:{aim:[0]}},exprightfirst:{tool:"numericPowToNum",input:{aim:[1,0]}},exprightsecond:{tool:"numericPowToNum",input:{aim:[1,1]}},divright:{tool:"eliminateCommonInnerFacsInFrac",input:{aim:[1],argument:{type:"number",val:"8"},choices:["self","self"],selection:[[0],[0]]}}}},exponentiationtower:{formula:"(a^b)^c=a^(b*c)",numeric:"(2^3)^4=2^(3*4)",steps:{expleftbase:{tool:"numericPowToNum",input:{aim:[0,0]}},expleft:{tool:"numericPowToNum",input:{aim:[0]}},multrightexp:{tool:"multiplication",input:{aim:[1,1]}},expright:{tool:"numericPowToNum",input:{aim:[1]}}}},exponentiationsumexp:{formula:"a^(b+c)=a^b*a^c",numeric:"4^(3+2)=4^3*4^2",steps:{addleftexp:{tool:"addition",input:{aim:[0,1]}},expleft:{tool:"numericPowToNum",input:{aim:[0]}},exprightfirst:{tool:"numericPowToNum",input:{aim:[1,0]}},exprightsecond:{tool:"numericPowToNum",input:{aim:[1,1]}},multright:{tool:"multiplication",input:{aim:[1]}}}},multiplicationfracs:{formula:"(a/b)*(c/d)=(ac)/(bd)",numeric:"(4/5)*(3/2)=(4*3)/(5*2)",steps:{divleftfirst:{tool:"fracToDecNum",input:{aim:[0,0]}},divleftsecond:{tool:"fracToDecNum",input:{aim:[0,1]}},multleft:{tool:"multiplication",input:{aim:[0]}},multrightfirst:{tool:"multiplication",input:{aim:[1,0]}},multrightsecond:{tool:"multiplication",input:{aim:[1,1]}},divright:{tool:"fracToDecNum",input:{aim:[1]}}}}};if(typeof exports==="undefined"){exportTo=this.CATS.math}else{exportTo=exports}exportTo.demonstrations=demonstrations}).call(this);