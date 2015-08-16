function Zapping() {
	var serviceList = [
	
		 				"http://10.60.61.85/NOS/videos/baymax.mp4",
						"http://10.60.61.85/NOS/videos/hobbits.mp4",
						"http://10.60.61.85/NOS/videos/dragon.mp4",
						"http://10.60.61.85/NOS/videos/melfique.mp4",
					  ];
	var currentVideo;
	var nextVideo;
	var videoDivCurrent;
	var videoDivCurrentChild;
	var videoDivNext;
	var seviceLenght = serviceList.length;
	var index = 0;

	var startPlay = function () {
		console.log("enter startPlay");
		currentVideo.setAttribute("src", serviceList[0]);
		nextVideo.setAttribute("src", serviceList[1]);
		currentVideo.load();
		try{currentVideo.changeMode(true);}catch(e){};
		setTimeout(function() {
			try{currentVideo.hidden = false;}catch(e){};
		}, 100);
		setTimeout(function() {
			try{currentVideo.changeMode(false);}catch(e){};
			console.log("currentVideo plain");
		}, 4000);
		setTimeout(function() {
			try{nextVideo.changeMode(false);}catch(e){};
			console.log("nextVideo plain");
		}, 7000);				
		currentVideo.play();
		nextVideo.load();
		try{nextVideo.changeMode(true);}catch(e){};
		setTimeout(function() {
			try{nextVideo.hidden = true;}catch(e){};
		}, 100);		
		nextVideo.play();
	}					 

	var next = function() {
		console.log("next");
		videoDivNext.setAttribute("style", "display:initial");
		try{currentVideo.changeMode(true);}catch(e){};
		try{nextVideo.changeMode(true);}catch(e){};
		currentVideo.hidden = false;
		nextVideo.hidden = false;
		videoDivCurrent.setAttribute("style", "width: 120%;height: 120%;-webkit-transform: rotate(-4.5deg) translateX(-51px) translateY(-140px);");
		videoDivCurrentChild.setAttribute("style", "width: 120%;height: 120%;-webkit-transform: rotate(4.5deg) translateX(55px) translateY(150px);");
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
		console.log("keyCode : " + e.keyCode);
		switch(e.keyCode) {
			case 37:
			/*left arrow on keyBoard*/
				break;
			case 39:
			/*right arrow*/
				break;
			case 38:
			/*up arrow*/
				break;
			case 40:
			/*down arrow*/
				next();
				break;
			default:
				break;
		}
	}

	var animEnd = function(e) {

		console.log("animation ends " + e.animationName);

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
    		nextVideo.setAttribute("src", serviceList[(index + 1) % seviceLenght]);
			try{currentVideo.changeMode(true);}catch(e){};
			setTimeout(function() {
				try{currentVideo.hidden = false;}catch(e){};
			}, 100);

    		setTimeout(function() {
				try{currentVideo.changeMode(false);}catch(e){};
				console.log("currentVideo plain");
			}, 4000);
			setTimeout(function() {
				try{nextVideo.changeMode(false);}catch(e){};
				console.log("nextVideo plain");
			}, 7000);	
    		nextVideo.load();
    		try{nextVideo.changeMode(true);
    		console.log("nextVideo textured");}catch(e){};
    		setTimeout(function() {
				try{nextVideo.hidden = true;}catch(e){};
				console.log("nextVideo is hidden");
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
   		style.href = 'zapping/css/style5.css';
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