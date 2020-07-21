document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});



$(".slider__content").slick({
  dots: true,
  fade: true,
  autoplay: true,
  touchMove: true,
  
})


window.addEventListener('scroll', () => {
  const header = document.querySelector('.header')
  const logo = document.getElementById('brand-logo')

  if(window.scrollY > 50){

    header.classList.add('sticky')
    logo.style.width = "100px"

  } else {
    header.classList.remove('sticky')
    logo.style.width = "129px"
  }
})


$(".video").modalVideo({
  channel: 'youtube',
  autoplay: 0
});

function initMap(){
  const location = { lat: -12.0665539, lng: -77.0166769 }
  const icon  = '../assets/images/icon.png'
  const style  =  [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]

  const map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 14,
    styles: style,
    streetViewControl: false,
    mapTypeControl: false

  })

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: icon,
    title: 'Mundo Gelato'
  })
}



window.onload = function(){
  initMap();
}


$('#form').click( function(event){
  
  $(this).validate({
    errorPlacement: function(label, element) {
      label.addClass('form-error');
      label.insertAfter(element);
    },
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        number: true,
        minlength: 7,
        maxlength: 9
      },
      message: {
        required: true,
        minlength: 5,
      }
    },
    messages: {
      name: 'Este campo es requerido',
      email: {
        required: 'Ingrese su correo',
        email: 'Ingrese un correo valido'
      },
      phone: {
        required: 'Ingrese su numero de contacto',
        minlength: 'Ingrese un numero valido',
        maxlength: 'Ingrese un numero valido',
        number: 'Ingrese un numero de contacto valido'
      },
      message: 'Ingrese su mensaje'
    },
    submitHandler: function(form){

        axios.get('https://jsonplaceholder.typicode.com/todos/1')
          .then( res => {
            $('#response').html('mensaje enviado')

            form.reset();
            // grecaptcha.reset();
            console.log(res.data)
        })
      // }
    }

  })
})

