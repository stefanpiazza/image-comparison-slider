var imageContainer = document.getElementById('container'),
    imageOriginal = document.getElementById('image-1'),
    imageModified = document.getElementById('image-2'),
    startX = 0,
    distanceX = 0,
    distanceXPercentage = 0,
    currentDistanceX = 50,
    touchStart = false;    

    var startHandler = function (event) {
        startX = (event.touches ? event.touches[0].pageX : event.pageX);
        touchStart = true;

        event.preventDefault();
    }

    var moveHandler = function (event) {
        //Webkit continuously fires mousemove
        if (touchStart) {
            distanceX = (event.touches ? event.touches[0].pageX : event.pageX) - startX;
            distanceXPercentage = ((distanceX/imageContainer.getBoundingClientRect().width) * 100);

            if (currentDistanceX + distanceXPercentage <= 0) {
                imageModified.style.width = '0%';
            }

            else if (currentDistanceX + distanceXPercentage >= 100) {
                imageModified.style.width = '100%';
            }

            else {
                imageModified.style.width = Math.floor(currentDistanceX + distanceXPercentage) + '%';
            }                    

            event.preventDefault();
        }
    }

    var endHandler = function (event) {
        currentDistanceX = currentDistanceX + distanceXPercentage;

        if (currentDistanceX <= 0) {
            currentDistanceX = 0;
        }

        else if (currentDistanceX >= 100) {
            currentDistanceX = 100;
        }

        distanceX = 0;
        distanceXPercentage = 0;
        touchStart = false;

        event.preventDefault();
    }

    imageContainer.addEventListener('touchstart', startHandler);
    imageContainer.addEventListener('touchmove', moveHandler);
    imageContainer.addEventListener('touchend', endHandler);

    imageContainer.addEventListener('mousedown', startHandler);
    imageContainer.addEventListener('mousemove', moveHandler);
    imageContainer.addEventListener('mouseup', endHandler);
    
    imageContainer.addEventListener('mouseleave', endHandler);