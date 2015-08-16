function Zapping() {
	var serviceList = [
	
		 				CONFIG.videoURL + "baymax.mp4",
						CONFIG.videoURL + "hobbits.mp4",
						CONFIG.videoURL + "dragon.mp4",
						CONFIG.videoURL + "melfique.mp4",
					  ];
	var currentVideo;
	var nextVideo;
	var videoDivCurrent;
	var videoDivCurrentChild;
	var videoDivNext;
	var seviceLenght = serviceList.length;
	var index = 0;

	var startPlay = function () {
		//console.log("enter startPlay");
		currentVideo.setAttribute("src", serviceList[0]);
		nextVideo.setAttribute("src", serviceList[1]);
		currentVideo.load();
		try{currentVideo.changeMode(false);}catch(e){};
		currentVideo.play();
		nextVideo.load();
		try{nextVideo.changeMode(false);}catch(e){};
		setTimeout(function() {
			try{nextVideo.hidden = true;}catch(e){};
		}, 100);
		nextVideo.play();
	}					 

	var next = function() {
		//console.log("next");
		try{currentVideo.changeMode(false);}catch(e){};
		currentVideo.hidden = false;
		nextVideo.hidden = false;
		videoDivCurrent.setAttribute("style", "width: 120%;height: 120%;-webkit-transform: rotate3d(0, 0, 1, -4.5deg) translate3d(-51px, -140px, 0);");
		videoDivCurrentChild.setAttribute("style", "width: 120%;height: 120%;-webkit-transform: rotate3d(0, 0, 1, 4.5deg) translate3d(55px, 150px, 0);");
		videoDivCurrent.setAttribute("class", "animDown");
		index++;
	}

	var reset = function() {
		videoDivCurrentChild.setAttribute("style", "");
		videoDivCurrent.setAttribute("style", "");
		videoDivCurrent.setAttribute("class", "");

		currentVideo = document.getElementById("currentVideo");
		nextVideo = document.getElementById("nextVideo");
		videoDivCurrent = document.getElementById("videoDivCurrent");
		videoDivCurrentChild = document.getElementById("childDivCurrent");
		videoDivNext = document.getElementById("videoDivNext");
		videoDivNextChild = document.getElementById("childDivNext");
	}

	var keyManager = function(e) {
		switch(e.keyCode) {
			case KEYS.NEXTSTB:
			case KEYS.NEXT:
				next();
				break;
			default:
				break;
		}
	}

	var animEnd = function(e) {

		//console.log("animation ends " + e.animationName);

		if (e.animationName === "myAnimDown")
		{
    		nextVideo.setAttribute("id", "currentVideo");
    		videoDivNext.setAttribute("id", "videoDivCurrent");
    		videoDivNextChild.setAttribute("id", "childDivCurrent");

    		currentVideo.setAttribute("id", "nextVideo");
    		videoDivCurrent.setAttribute("id", "videoDivNext");
    		videoDivCurrentChild.setAttribute("id", "childDivNext");

    		reset();
    		videoDivCurrent.addEventListener('webkitAnimationEnd', animEnd, false );
    		//console.log((index + 1) % seviceLenght);
    		try{currentVideo.changeMode(false);}catch(e){};
    		
    		nextVideo.setAttribute("src", serviceList[(index + 1) % seviceLenght]);
    		nextVideo.load();
    		try{nextVideo.changeMode(false);}catch(e){};
    		setTimeout(function() {
				try{nextVideo.hidden = true;}catch(e){};
			}, 100);
			nextVideo.play();
		}
	}

	this.init = function () {
		console.log("=== init Zapping ===");
		var container = document.createElement("div");
        var style = document.createElement( 'link' );    
        var height = screen.height;
	    var width = screen.width;    

	    console.log("screen.height = " + height);
	    console.log("screen.width = " + width);

   		style.rel = 'stylesheet';
   		style.type = 'text/css';
   		style.href = 'zapping/css/style.css';
   		document.getElementsByTagName( 'head' )[0].appendChild(style);

		container.setAttribute("id", "ZappingContainer");
		document.body.appendChild(container);

		container.innerHTML = "<div id='videoDivCurrent'>" +
								"<div id='childDivCurrent'>" +
			  						"<video  id='currentVideo' preload='metadata' autoplay='true' loop muted height=" + height + " width=" + width + ">" +
			    						"<source type='video/mp4'></source>" +
			  						"</video>" +
								"</div>" +
							"</div>" +
							"<div id='videoDivNext'>" +
							  "<div id='childDivNext'>" +
			 	 				"<video id='nextVideo' preload='metadata' autoplay='true' loop muted height=" + height + " width=" + width + ">" +
			    					"<source type='video/mp4'></source>" +
			  					"</video>" +
			  				  "</div>" +
							"</div>";
		currentVideo = document.getElementById("currentVideo");
		nextVideo = document.getElementById("nextVideo");
		videoDivCurrent = document.getElementById("videoDivCurrent");
		videoDivCurrentChild = document.getElementById("childDivCurrent");
		videoDivNext = document.getElementById("videoDivNext");
		videoDivNextChild = document.getElementById("childDivNext");

		document.body.addEventListener("keydown", keyManager, false);
		videoDivCurrent.addEventListener('webkitAnimationEnd', animEnd, false );

		startPlay();
	}


}