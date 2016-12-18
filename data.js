var verseData = {
    delimiter:"।", // means we insert a newline upon this character,
    unMapped:[" ","।","॥"],//these characters should not be part of the "game"
    printCode: function(verse){ //only for debugging n stuff
	for(i in verse){
	    console.log(verse.charAt(i) + " " + verse.charCodeAt(i));
	}
    },
    characterMappings: {
	vovels: {
	    "अ":"a",
	    "आ":"ā",
	    "इ":"i",
	    "ई":"ī",
	    "उ":"u",
	    "ऊ":"ū",
	    "ऋ":"ṛ",
	    "ॠ":"ṝ",
	    "ऌ":"ḷ",
	    "ए":"e",
	    "ऐ":"ai",
	    "ओ":"o",
	    "औ":"au"
	},
	appendedVovels: {
	    //"":"a",
	    "ा":"ā",
	    "ि":"i",
	    "ी":"ī",
	    "ु":"u",
	    "ू":"ū",
	    "ृ":"ṛ",
	    "ॄ":"ṝ",
	    "ॢ":"ḷ",
	    "े":"e",
	    "ै":"ai",
	    "ो":"o",
	    "ौ":"au"
	},
	consonants: {
	    "क":"k",
	    "ख":"kh",
	    "ग":"g",
	    "घ":"gh",
	    "ङ":"ṅ",
	    "च":"c",
	    "छ":"ch",
	    "ज":"j",
	    "झ":"jh",
	    "ञ":"ñ",
	    "ट":"ṭ",
	    "ठ":"ṭh",
	    "ड":"ḍ",
	    "ढ":"ḍh",
	    "ण":"ṇ",
	    "त":"t",
	    "थ":"th",
	    "द":"d",
	    "ध":"dh",
	    "न":"n",
	    "प":"p",
	    "फ":"ph",
	    "ब":"b",
	    "भ":"bh",
	    "म":"m",

	    "य":"y",
	    "र":"r",
	    "ल":"l",
	    "व":"v",
	    "श":"ś",
	    "ष":"ṣ",
	    "स":"s",
	    "ह":"h"
	    
 
	}

    },
    createMappings: function(verse){
	//todo
	var VIRAMA = 0x094D; //concatenation character
	var mappings = [];
	var sanskrit = "";
	var iast  = "";
	var lc = ""; //last character
	for(i in verse+" "){ //looping through sanskrit to parsing into syllables
	    var c=verse[i];
	    if(c.charCodeAt() == VIRAMA){
		sanskrit+=c;
	    }else if(lc in this.characterMappings.consonants && !(c in this.characterMappings.appendedVovels)){
		iast+='a'; //inherent vovel
		mappings.push([sanskrit,iast]);
		sanskrit="";
		iast="";
	    }
	    
	    if(c in this.characterMappings.appendedVovels){
		sanskrit+=c;
		iast+=this.characterMappings.appendedVovels[c];
		mappings.push([sanskrit,iast]);
		sanskrit="";
		iast="";
	    }
	    else if(c in this.characterMappings.vovels){
		sanskrit+=c;
		iast+=this.characterMappings.vovels[c];
		mappings.push([sanskrit,iast]);
		sanskrit="";
		iast="";
	    }else if(c in this.characterMappings.consonants){
		sanskrit+=c;
		iast+=this.characterMappings.consonants[c];
	    }
	    lc = c;
	}
	return mappings;

    },
    verses:
    [
	{ 
	    description:"Introductory Doha 1",
	    sanskrit: "श्रीगुरु चरन सरोज रज निज मन मुकुरु सुधारि । बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥",
	    mappings: [ //function for generating these mappings automatically has been added later, leaving these anyway
		["श्री","śrī"],
		["गु","gu"],
		["रु","ru"],
		["च","ca"],
		["र","ra"],
		["न","na"],
		["स","sa"],
		["रो","ro"],
		["ज","ja"],
		["र","ra"],
		["ज","ja"],
		["नि","ni"],
		["ज","ja"],
		["म","ma"],
		["न","na"],
		["मु","mu"],
		["कु","ku"],
		["रु","ru"],
		["सु","śu"],
		["धा","dhā"],
		["रि","ri"],
		["ब","ba"],
		["र","ra"],
		["न","na"],
		["उँ","u"],
		["र","ra"],
		["घु","ghu"],
		["ब","ba"],
		["र","ra"],
		["बि","bi"],
		["म","ma"],
		["ल","la"],
		["ज","ja"],
		["सु","śu"],
		["जो","jo"],
		["दा","dā"],
		["य","ya"],
		["कु","ku"],
		["फ","pha"],
		["ल","la"],
		["चा","cā"],
		["रि","ri"]
	    ]
	    //shrīguru charana saroja raja nija mana mukuru sudhāri।
	    //baranau raghubara bimala jasu jo dāyaku phala chāri॥
	}
	//next verse to come here... eventually
    ]
};

for(var i=1; i < verseData.verses.length; i++){ //mappings has been done manually for the first verse already
    verseData.verses[i].mappings = verseData.createMappings(verseData.verses[i].sanskrit);
}
