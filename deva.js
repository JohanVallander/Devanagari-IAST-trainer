
var deva={
    maxVisibleSyllables : 6,  //Nr of clickable IAST choices visible to the user
    initSyllables : function(mappings){
	this.mappings = this.scrambleList(mappings,this.maxVisibleSyllables);
	$("#syllables").empty();
	for(var i=0;i<this.maxVisibleSyllables; i++){
	    this.addSyllableButton();
	}
    },
    addSyllableButton : function(){
	m = this.mappings.shift();
	devanagari = m[0];
	iast = m[1];    
	button = $('<button type="button" class="syllable-button btn btn-primary" value="' + devanagari + '">' + iast +'</button>');
	button.hide();
	$("#syllables").append(button);
	button.click(function(){
	    deva.syllableClick(this);
	});
	button.fadeIn(1000);
	
    },
    updateSyllableButton : function(button){
	if(this.mappings.length > 0){
	    m = this.mappings.shift();
	    devanagari = m[0];
	    iast = m[1];
	    $(button).html(iast);
	    $(button).attr("value",devanagari);
	    $(button).removeClass('btn-success');
	    $(button).addClass('btn-primary');
	    $(button).fadeTo(1000,1);
	}
    },
    scrambleList: function(list,maxOutOfOrder){
	var scrambledList=[];
	for(i in list){
	    var item={
		element:list[i].slice(),
		originalPosition:i
	    };
	    scrambledList.push(item);
	    
	}
	for(i=0;i<1000;i++){
	    //kind of a randomized bubble sort that before every swap checks that they don't get to much out of order
	    //This is because we only display a limited number of choices for the user,
	    //and the required choice has to be within this limited set.
	    var swapPos1=Math.floor(Math.random()*scrambledList.length);
	    var swapPos2=Math.floor(Math.random()*scrambledList.length);
	    var swap1 = scrambledList[swapPos1];
	    var swap2 = scrambledList[swapPos2];
	    
	    if(swapPos2-swap1.originalPosition >= maxOutOfOrder)
		continue;
	    if(swapPos1-swap2.originalPosition >= maxOutOfOrder)
		continue;
	    
	    scrambledList[swapPos1]=swap2;
	    scrambledList[swapPos2]=swap1;	
	}
	returnList=[];
	for(var i in scrambledList){
	    returnList.push(scrambledList[i].element);
	}
	return returnList;
    },
    
    syllableClick : function(button){
	var devanagari = $(button).attr("value");
	if(devanagari == this.currentVerse.mappings[this.mappingsPosition][0]){
	    //correct button clicked , we should make some more letters green
	    this.mappingsPosition++;
	    var index = this.remainingSanskrit.search(devanagari) + devanagari.length;
	    
	    this.readySanskrit += deva.remainingSanskrit.slice(0,index);
	    this.remainingSanskrit = deva.remainingSanskrit.slice(index);
	    
	    this.updateSanskrit();
	    //and we should turn the button green
	    $(button).removeClass('btn-primary');
	    $(button).addClass('btn-success');
	    $(button).fadeTo(900,0.05,function(){
		deva.updateSyllableButton(this);
	    });
	}else{
	    $(button).removeClass('btn-primary');
	    $(button).addClass('btn-danger');
	    setTimeout(function () {
		$(button).removeClass('btn-danger');
		$(button).addClass('btn-primary');
	    },1000);
	}
    },
    
    updateSanskrit: function(){
	ready = '<span class="text-success">'+deva.readySanskrit+'</span>';
	remaining = '<span class="text-muted">'+deva.remainingSanskrit+'</span>';
	sanskrit = ready + remaining;
	sanskrit = sanskrit.replace(verseData.delimiter,verseData.delimiter+"<br/>");
	$("#sanskrit_verse").html(sanskrit);
	
	if(this.currentVerse.mappings.length == this.mappingsPosition){ //check if we have completed one verse totally
	    console.log("ALL DONE");
	    this.currentVerseNr++;
	    $('#sanskrit_verse').fadeTo(500,0.05,function(){
		deva.loadVerse();
	    });	    
	}	    
    },
    
    loadVerse: function(){
	this.currentVerse=verseData.verses[this.currentVerseNr];
	this.readySanskrit="";
	this.remainingSanskrit=this.currentVerse.sanskrit;
	this.mappingsPosition=0;
	this.updateSanskrit();
	this.initSyllables(this.currentVerse.mappings);
	$('#sanskrit_verse').fadeTo(500,1);
    },    
}

$(function(){
    deva.currentVerseNr=0;
    deva.loadVerse();
});
