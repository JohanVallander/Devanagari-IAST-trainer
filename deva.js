
var deva={
    updateSanskrit: function(){
	ready = '<span class="text-success">'+deva.readySanskrit+'</span>';
	remaining = '<span class="text-muted">'+deva.remainingSanskrit+'</span>';
	sanskrit = ready + remaining;
	sanskrit = sanskrit.replace(verseData.delimiter,verseData.delimiter+"<br/>");
	$("#sanskrit_verse").html(sanskrit);	
    },
    loadVerse: function(verseNr){
	deva.currentVerse=verseData.verses[verseNr]
	
	deva.readySanskrit="";
	deva.remainingSanskrit=deva.currentVerse.sanskrit;
	deva.updateSanskrit();
	deva.mappings = deva.scrambleList(this.currentVerse.mappings,100);
	$("#syllables").empty();
	for(i in this.mappings){
	    devanagari = deva.mappings[i][0];
	    iast = deva.mappings[i][1];

	    button = $('<button type="button" class="syllable-button btn btn-primary" value="' + devanagari + '">' + iast +'</button>');
	    $("#syllables").append(button);
	}
	$("button.syllable-button").click(function(){
	    deva.syllableClick(this);
	});	
    },
    
    syllableClick : function(button){
	var devanagari = $(button).attr("value");
	console.log("click " + devanagari);

	var strippedRemaining = deva.remainingSanskrit;
	
	for(var i in verseData.unMapped){
	    var unMapped=verseData.unMapped[i];
	    //not so pretty but couldn't find out how to make a global replace without regexp
	    while(strippedRemaining.search(unMapped) != -1){
		strippedRemaining=strippedRemaining.replace(unMapped,"");
	
	    }
	    
	
	}
	if(strippedRemaining.search(devanagari) == 0){
	    //correct button clicked , we should make some more letters green
	    console.log("hit");
	    
	    var index = deva.remainingSanskrit.search(devanagari) + devanagari.length;

	    deva.readySanskrit += deva.remainingSanskrit.slice(0,index);
	    deva.remainingSanskrit = deva.remainingSanskrit.slice(index);

	    deva.updateSanskrit();
	    //and we should turn the button green
	    $(button).removeClass('btn-primary');
	    $(button).addClass('btn-success');
  
	    $(button).delay(337).fadeOut(1000);
	    
	}else{
	    $(button).removeClass('btn-primary');
	    $(button).addClass('btn-danger');
	    setTimeout(function () {
		$(button).removeClass('btn-danger');
		$(button).addClass('btn-primary');
	    },1000);
	}
    },

    scrambleList: function(list,maxOutOfOrder){
	var newList=[];
	for(i in list){
	    var item=list[i].slice();
	    newList.push(item);//We want a deep copy
	    
	}
	var returnList=[];
	while(newList.length){
	    var rightEnd=Math.min(newList.length-1,maxOutOfOrder);
	    var index=Math.floor(Math.random()*rightEnd);
	    var item=newList.splice(index,1)[0];
	    returnList.push(item);
	}
	return returnList;
    }
    

    
}

$(function(){
    deva.loadVerse(0);
});
