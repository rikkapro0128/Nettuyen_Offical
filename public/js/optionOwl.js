export default function() {
    let owl = $(".owl-carousel");
    owl.owlCarousel({
        autoplay: true,
        items: 6,
        dots: false,
        rewind: true,
        navText: [
            '<i class="fas fa-arrow-left"></i>',
            '<i class="fas fa-arrow-right"></i>',     
        ],
        navContainer: '#owl--directly',
    });
}
