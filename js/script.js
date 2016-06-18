/*
 * Runek
 * http://www.scoopthemes.com/
 *
 * Copyright (c) 2014, ScoopThemes
 * Licensed under the BSD license.
 */
'use strict';

var appMaster = {

    preLoader: function(){
        var imageSources = [];
        $('img').each(function() {
            var sources = $(this).attr('src');
            imageSources.push(sources);
        });
        if($(imageSources).load()){
            $('.pre-loader').fadeOut('slow');
        }
    },

    navSpy: function(){
        /* affix the navbar after scroll below header */
        $('#nav.navbar-static-top').affix({
            offset: {
                top: $('header').height() - $('#nav').height()
            }
        });

        /* highlight the top nav as scrolling occurs */
        $('body').scrollspy({
            target: '#nav'
        });
    },

    smoothScroll: function() {
        // Smooth Scrolling 
        $('a[href*=#]:not([href=#carousel-example-generic], [href=#testimonials-carousel], [href=#carousel-team], [href=#carousel-slider])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    },

    scollToTop: function(){
        /* smooth scrolling for scroll to top */
        $('.scroll-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
    },

    headerSlider: function(){

        var docHeight = $(window).height();
        
        $("#slider").height(docHeight + "px");

        $('.mh-container').height(docHeight + "px");

    },
    owlCarousel: function(){
        var owl = $("#owl-screenshots");

        owl.owlCarousel({
            pagination:false
        });

        $(".owl-next").click(function() {
            owl.trigger('owl.next');
        });

        $(".owl-prev").click(function(){
            owl.trigger('owl.prev');
        });
    },

    maps: function(){
        // When the window has finished loading create our google map below
        google.maps.event.addDomListener(window, 'load', init);
        google.maps.event.addDomListener(window, 'resize', init);

        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                zoom: 14,
                draggable: false,
                zoomControl: true, 
                scrollwheel:false,
                streetViewControl:false,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(31.1997396,29.9194378), // New York

                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                styles: [
                    {
                        "featureType": "landscape",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "stylers": [
                            {
                                "hue": "#00aaff"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "gamma": 2.15
                            },
                            {
                                "lightness": 12
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "lightness": 24
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "lightness": 57
                            }
                        ]
                    }
                ]
            };

            // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using out element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
            var myLatlng = new google.maps.LatLng(31.1997396,29.9194378);
            var image = {
                url: '../img/map_pin.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(64, 93),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            };

            var marker = new google.maps.Marker({
                position: myLatlng,
                icon: image,
                map: map,
                title: 'Hello World!'
            });

        }
    },
    animateScript: function() {
        $('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'100%'});
       $('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'100%'});
       $('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'100%'});
       $('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'100%'});
       $('.scrollpoint.sp-effect5').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInUp');},{offset:'100%'});
       $('.scrollpoint.sp-effect6').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated bounceIn');},{offset:'100%'});
    }
};


$(document).ready(function() {

    appMaster.smoothScroll();
    appMaster.animateScript();
    appMaster.navSpy();
    appMaster.scollToTop();
    appMaster.headerSlider();
    appMaster.owlCarousel();
    appMaster.maps();

});