(function(){
	var client ={
		data:{
			recognition:undefined,
			voice: undefined,
			counter:0,
			interval: undefined
		},
		init: function(){
			this.recognition.init(this);
			//this.data.interval = setInterval((function(){this.recognition.init(this)}).bind(this),10000)
		},
		recognition: {
			init: function(that){
				that.data.recognition?that.data.recognition.abort():true;
				var recognition = new webkitSpeechRecognition();
			    recognition.interimResults = false;
			    recognition.continuous = false;			    
				recognition.lang = 'es';
			    recognition.onstart = this.start;
			    recognition.onresult = this.result.bind(that);
			    recognition.onend = (function(){
			    	recognition.start();
			    }).bind(that)
			    that.data.recognition = recognition;
			    recognition.start();
			},
			start: function(e){
				console.log(e);
			},
			result: function(e){
				console.log(e)
				if(e.results[0].isFinal){
					//clearInterval(this.data.interval)
					var msg = e.results[0][0].transcript.toLowerCase();
					console.log(msg);
			    	this.voice.processor(msg,this);			    	
				}
			    		  
			}
		},
		voice:{
			processor: function(msg, that){
				switch(true){
					case /cuantos son/.test(msg) || /cuanto son/.test(msg) || /cuanto es/.test(msg) || /cuántos son/.test(msg) || /cuánto son/.test(msg) || /cuánto es/.test(msg):
						msg = msg.replace('amanda','');msg = msg.replace('cuantos son','');msg = msg.replace('cuanto es','');msg = msg.replace('cuanto son','');
						msg = msg.replace('cuantos son','');msg = msg.replace('cuánto es','');msg = msg.replace('cuánto son','');
						msg = msg.trim();
						var result = undefined;
						if(/más/.test(msg) || /\+/.test(msg)){
							var numbers = msg.split('más')
							result = String(Number(numbers[0])+Number(numbers[1]))
							var operation = "más"
						}else if(/menos/.test(msg) || /\-/.test(msg)){
							var numbers = msg.split('menos')
							result = String(Number(numbers[0])-Number(numbers[1]))
							var operation = "menos"
						}else if(/entre/.test(msg) || /\//.test(msg)){
							var numbers = msg.split('entre')
							result = String(Number(numbers[0])/Number(numbers[1]))
							var operation = "entre"
						}else if(/por/.test(msg) || /\*/.test(msg)){
							var numbers = msg.split('por')
							result = String(Number(numbers[0])*Number(numbers[1]))
							var operation = "por"
						}
						if(result){
							this.talk(numbers[0] +' '+ operation + numbers[1] + ' es '+result, that);
						}else{
							this.talk('Perdona,No te he entendido', that);
						}					
					break;
					case /enciende/.test(msg):
					if(/led/.test(msg)){
						var device = 'led';
						if(/rojo/.test(msg)){
							var color = 'rojo';
						}
						if(/amarillo/.test(msg)){
							var color = 'amarillo';
							
						}
						if(/verde/.test(msg)){
							var color = 'verde';
							
						}
					}
					if(color){
						$.get( "/api/"+device+"/"+color, (function( data ) { 
						  console.log( data );
						  this.talk('encendido', that);
						}).bind(this));
					}else{
						 this.talk('No hay led de ese color', that);
					}
					break;
					case /vale/.test(msg):
					this.talk('¿Algo más?', that);
					break;
					case /sí/.test(msg) || /no/.test(msg):
					this.talk('vale', that);
					break;									
					case /amanda/.test(msg):
					this.talk('si?', that);
					break;					
					default:
					this.talk(msg+'?', that);				

					break;
				}
			},
			talk: function(msg, that){
				var utterance = new SpeechSynthesisUtterance(msg); 
				utterance.rate =1.12;
				utterance.voice = speechSynthesis.getVoices()[5]; 
				speechSynthesis.speak(utterance);
				utterance.onend = function(){
				}
				

			}
		},
		encenderLed: function(){

		},
		get: function(){

		}
	}
	client.init();
})()