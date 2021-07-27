import '/owl.carousel/dist/owl.carousel.min.js';

export default function() {
    let owl = $(".owl-carousel");
    owl.owlCarousel({
        margin: 18,
        rewind: true, 
        // autoplay: true,
        dots: false, 
        responsive:{
            0:{
                items: 1,
            },
            430: { 
                items: 2,
            },
            720:{
                items:3,
            },
            860:{
                items:4,
            },
            1100:{
                items:5,
            },
            1400:{
                items:6,
            },
            1600:{
                items:7,
            },
            1900:{
                items:8,
            },
        }
    });
}
