!function(t){function e(i){if(o[i])return o[i].exports;var s=o[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var o={};e.m=t,e.c=o,e.d=function(t,o,i){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,o){o(1),$(document).ajaxComplete(function(t,e,o){$("#dob0").prop("readonly",!1),$("#dob0").focus(),$(".th0 .save").show(),$(".th0 .okey").show(),$(".okey").click(function(){var t,e=$("input",this).attr("value");$(".th"+e+" .save").hide(),$(".th"+e+" .okey").hide(),$("#accepted"+e).css({visibility:"hidden"}),$("#dob"+e).hide(),$("#skipped"+e).css({visibility:"visible"}),$(".td"+e).css({background:"#fbe3e4"}),$("#copyfirst .td"+e).css({background:"#ee836e"}),$(".td"+e).css({"border-color":"#ee836e"}),$(".th"+e).css({"border-color":"#ee836e"}),$("#dob"+e).prop("value",""),e++,$(".th"+e+" .save").show(),$(".th"+e+" .okey").show(),$("#copyfirst .td"+e).each(function(){t=$(this).html()}),""===$("#dob"+e).val()&&$("#dob"+e).val(t),$("#dob"+e).show(),$("#dob"+e).prop("readonly",!1),$("#dob"+e).focus(),$(".box-primary input").length===$("input:hidden").length&&$("#finish").prop("disabled",!1)}),$(".save").click(function(){var t,e=$("input",this).attr("value");if(""===$("#dob"+e).val())return void alert("not empty");$(".th"+e+" .save").hide(),$(".th"+e+" .okey").hide(),$("#skipped"+e).css({visibility:"hidden"}),$("#dob"+e).hide(),$("#accepted"+e).css({visibility:"visible"}),$("#copyfirst .td"+e).each(function(){t=$(this).html()}),$(".td"+e).css({background:"#b1e0ec"}),$("#copyfirst .td"+e).css({background:"#52bad5"}),$(".td"+e).css({"border-color":"#52bad5"}),$(".th"+e).css({"border-color":"#52bad5"}),e++,$("#copyfirst .td"+e).each(function(){t=$(this).html()}),""===$("#dob"+e).val()&&$("#dob"+e).val(t),$("#dob"+e).show(),$("#dob"+e).prop("readonly",!1),$("#dob"+e).focus(),$(".th"+e+" .save").show(),$(".th"+e+" .okey").show(),$(".box-primary input").length===$("input:hidden").length&&$("#finish").prop("disabled",!1)}),$(".enableinput").click(function(){$("#finish").prop("disabled",!0);var t,e=parseInt($("input",this).attr("value")),o=e+1;$(".head").prop("readonly",!0),$("#dob"+e).prop("readonly",!1),$("#copyfirst .td"+e).each(function(){t=$(this).html()}),""===$("#dob"+e).val()&&$("#dob"+e).val(t),$("#dob"+o).prop("readonly",!0),$(".th"+e+" .save").show(),$(".th"+e+" .okey").show(),$("#dob"+e).show(),$("#accepted"+e).css({visibility:"hidden"}),$("#skipped"+e).css({visibility:"hidden"}),$(".box-primary input").length===$("input:hidden").length&&$("#finish").prop("disabled",!1)}),$("#finish").click(function(){var t=$("form").serializeArray(),e=t;console.log(e),$(".se-pre-con").show(),$.ajax({url:"https://csvfilesapp.herokuapp.com/csv/add",type:"POST",data:e,success:function(){console.log("ajax ok"),$(".se-pre-con").hide()}})})})},function(t,e){$("#myfile").change(function(t){var e=t.target.files[0],o=new FormData;o.append("myfile",e),$("#myfile").hide(),$(".se-pre-con").show(),$.ajax({url:"https://csvfilesapp.herokuapp.com/csv",type:"post",data:o,processData:!1,contentType:!1,success:function(t){$(".se-pre-con").hide();for(var e=t.donne,o=Object.keys(e[1]),i=0;i<o.length;i++)$("#copyfirst").append("<td class='td"+i+"'>"+o[i]+"</td>"),$("#first").append("<td class='td"+i+"'>"+e[0][o[i]]+"</td>"),$("#second").append("<td class='td"+i+"'>"+e[1][o[i]]+"</td>"),$("#third").append("<td class='td"+i+"'>"+e[2][o[i]]+"</td>"),$("#fourth").append("<td class='td"+i+"'>"+e[3][o[i]]+"</td>"),$("#thead").append("<th class='th"+i+"'><input type='text' readonly value='"+o[i]+"'id ='dob"+i+"' class='head' name='f"+i+"'/><button type='button' class='btn btn-warning okey'>Skip <input type='hidden' id='positionskip' value='"+i+"'/></button><button type='button' class='btn btn-info save'>Save <input type='hidden' id='positionsave' value='"+i+"'/></button></button><p class='skip text-center' id='skipped"+i+"'> Will not be imported <br><a href='#' class='enableinput'>Edit <input type='hidden' id='position' value='"+i+"'/></a> </p> <p class='accept text-center' id='accepted"+i+"'> Will be imported <br> <a href='#' class='enableinput'>Edit <input type='hidden' id='position' value='"+i+"'/></a></p></th> ");$("foot").append("<button type='submit' id='finish' disabled='true' class='btn btn-success'>Finish</button>")},crossDomain:!0})})}]);