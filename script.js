var image_field = document.getElementById("image_field");

image_field.addEventListener('change', function(event) {
    	var files = event.target.files;
        var file = files[0];
        
        if(file) {
        	var reader = new FileReader();

        	reader.onload = function(e) {
        		var img = document.createElement("img");
                img.src = e.target.result;

                img.onload = function() {
	                var canvas = document.createElement("canvas");
	                var ctx = canvas.getContext("2d");
	                ctx.drawImage(img, 0, 0);

	                var MAX_WIDTH = 600;
	                var MAX_HEIGHT = 600;
	                var width = img.width;
	                var height = img.height;

	                if (width > height) {
	                    if (width > MAX_WIDTH) {
	                        height *= MAX_WIDTH / width;
	                        width = MAX_WIDTH;
	                    }
	                } else {
	                    if (height > MAX_HEIGHT) {
	                        width *= MAX_HEIGHT / height;
	                        height = MAX_HEIGHT;
	                    }
	                }
	                canvas.width = width;
	                canvas.height = height;
	                var ctx = canvas.getContext("2d");
	                ctx.drawImage(img, 0, 0, width, height);

	                // Webp if we can, else jpeg.
	                var dataurl = canvas.toDataURL('image/webp', 0.6);
	                if(dataurl.substring(0, 14) == "data:image/png") {
	                	dataurl = canvas.toDataURL('image/jpeg', 0.6);
	                }

	                var el = document.getElementById('output');
	                el.innerHTML = '';

	                link_uri = window.location.protocol + "//" + 
	                	window.location.host +
	                	"/?img=" + encodeURIComponent(dataurl);

	                var markdown = document.createElement('p');
	                markdown.textContent = "[Link Text](" + link_uri + ")";
	                el.appendChild(markdown);

            	}

        	}

        	reader.readAsDataURL(file);
        }
    });

var urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('img')) {
	var dataurl = urlParams.get('img');
	document.getElementById('img').src = dataurl;

	var el = document.getElementById('output');
	el.innerHTML = '';

	link_uri = window.location.protocol + "//" + 
    	window.location.host +
    	"/?img=" + encodeURIComponent(dataurl);

    var markdown = document.createElement('p');
    markdown.textContent = "[Link Text](" + link_uri + ")";
    el.appendChild(markdown);
}
