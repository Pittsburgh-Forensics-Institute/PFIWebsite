$(document).ready(function(){
	
	checkPosition(); //check the page position on init

	//function to constantly check the scroll position
	$(document).scroll(function(){
		checkPosition();
	});

	//function that checks the page position and edits how the navbar looks based on where the user has scrolled
	function checkPosition(){
		var position = $(this).scrollTop();
		if(position == 0)
			$(".navbar").removeClass("navbarStateWhenScrolled");
		else
			$(".navbar").addClass("navbarStateWhenScrolled");
	}

	// Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
                }, 900, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});