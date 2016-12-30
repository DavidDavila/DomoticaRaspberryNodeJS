exports.Voice = {
	talk : function(msg){
		let body = document.getElementByID('body')
		body.appendChild(`
		  	<script>(function(){
		    	var utterance = new SpeechSynthesisUtterance('`+decodeURIComponent(msg)+`'); 
				  utterance.rate =1.12;
				  utterance.voice = speechSynthesis.getVoices()[5]; 
				  speechSynthesis.speak(utterance);
		    })()</script>
		`);
	}
}