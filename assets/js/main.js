
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 75,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 9000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }


  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /*progress bar*/
  setTimeout(function(){

  $(function progressbar() {
    var current_progress = 0;
    var interval = setInterval(function() {
        current_progress += 1;
        $("#dynamic1")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
       /* .text(current_progress + "% Complete"); */
        if (current_progress >= 100)
            clearInterval(interval);
    }, 50);
  }); 

  $(function() {
    var current_progress = 0;
    var interval = setInterval(function() {
        current_progress += 1;
        $("#dynamic2")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
       /* .text(current_progress + "% Complete"); */
        if (current_progress >= 100)
            clearInterval(interval);
    }, 40);
  }); 

  $(function() {
    var current_progress = 0;
    var interval = setInterval(function() {
        current_progress += 1;
        $("#dynamic3")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
       /* .text(current_progress + "% Complete"); */
        if (current_progress >= 100)
            clearInterval(interval);
    }, 30);
  }); 

  $(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});

  $(function() {
    var current_progress = 0;
    var interval = setInterval(function() {
        current_progress += 1;
        $("#dynamic4")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
       /* .text(current_progress + "% Complete"); */
        if (current_progress >= 100)
            clearInterval(interval);
    }, 20);
  }); 
  },4000);
})()

/* Tools slider */
var siteOwlCarousel = function() {
  $('.clients-carousel').owlCarousel({
    center: true,
    items: 6,
    loop: true,
    margin: 10,
    slideTransition: 'linear',
    rewindNav:false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    nav: false,
    dots: false,
    autoWidth: true,
    responsive: {
      0 : {
        items: 2
      },
      576 : {
        items: 3
      },
      768 : {
        items: 4
      },
      992 : {
        items: 4
      },
      1200 : {
        items:6
      }
    }
  });
};
siteOwlCarousel();


/*     jQuery(document).ready(function() {
        var $carousel2 = jQuery('.owl-carousel.slideshow');
        $carousel2.owlCarousel({
            loop: true,
            items: 4,
            autoplay: true,
           
            smartSpeed: 3500,
            autoplayHoverPause: false,
            margin: 0,
            center: true,
            nav: false,
            dots: false,
            autowidth: true,
            responsive: {
              0 : {
                items: 2
              },
              576 : {
                items: 3
              },
              768 : {
                items: 4
              },
              992 : {
                items: 4
              },
              1200 : {
                items: 6
              }
            },
        });

       
    }); */
