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
	    var c=verse.charAt(i);
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
	},
	{ 
	    description:"Introductory Doha 2",
	    sanskrit: "बुद्धिहीन तनु जानिकै सुमिरौं पवनकुमार।बल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार॥",
	},
	{ 
	    description:"The Chalisa, verse 1",
	    sanskrit: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥",
	},
	{ 
	    description:"The Chalisa, verse 2",
	    sanskrit: "राम दूत अतुलित बल धामा। अंजनि पुत्र पवनसुत नामा॥",
	},
	{ 
	    description:"The Chalisa, verse 3",
	    sanskrit: "महावीर विक्रम बजरंगी।कुमति निवार सुमति के संगी॥",
	},
	{ 
	    description:"The Chalisa, verse 4",
	    sanskrit: "कंचन बरन बिराज सुबेसा।कानन कुंडल कुंचित केसा॥",
	},
	{ 
	    description:"The Chalisa, verse 5",
	    sanskrit: "हाथ बज्र औ ध्वजा बिराजै।काँधे मूँज जनेऊ साजै॥",
	},
	{ 
	    description:"The Chalisa, verse 6",
	    sanskrit: "शंकर सुवन केसरी नंदन।तेज प्रताप महा जग बंदन॥ ",
	},
	{ 
	    description:"The Chalisa, verse 7",
	    sanskrit: "विद्यावान गुनी अति चातुर।राम काज करिबे को आतुर॥",
	},
	{ 
	    description:"The Chalisa, verse 8",
	    sanskrit: "प्रभु चरित्र सुनिबे को रसिया।राम लखन सीता मन बसिया॥",
	},
	{ 
	    description:"The Chalisa, verse 9",
	    sanskrit: "सूक्ष्म रूप धरी सियहिं दिखावा।बिकट रूप धरि लंक जरावा॥",
	},
	{ 
	    description:"The Chalisa, verse 10",
	    sanskrit: "भीम रूप धरि असुर सँहारे।रामचन्द्र के काज सँवारे॥",
	}
	
    ]
};

for(var i=1; i < verseData.verses.length; i++){ //mappings has been done manually for the first verse already
    verseData.verses[i].mappings = verseData.createMappings(verseData.verses[i].sanskrit);
}
