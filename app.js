var styles = window.getComputedStyle(
  document.querySelector('.card-principal'),
  ':before'
)

/*  https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=8dc516a9061a5ea2b1d337390600c4d2 

CHAMADA COM LATITUDE E LONGITUDE
*/

/* https://api.openweathermap.org/data/2.5/forecast?q=curitiba&units=metric&lang=pt_br&APPID=8dc516a9061a5ea2b1d337390600c4d2

CHAMADA COM CIDADE */

$(document).ready(function () {
  console.log($(window).width())
  console.log($(window).height())
  $('.imagem , .bg-gradient').width($(window).width())
  $('.imagem , .bg-gradient').height($(window).height())
})

var lat, lon
var promise1 = new Promise(function (resolve, reject) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude
    lon = pos.coords.longitude
    resolve({ lat, lon })
  })
})
promise1.then(function (value) {
  var urllat = `http://open.mapquestapi.com/geocoding/v1/reverse?key=AJuwrmj0RsJSxbzim9CEfbBGzqCsN5lT&location=${value.lat},${value.lon}&includeRoadMetadata=true&includeNearestIntersection=true`

  $.get(urllat, function getlocation(response) {
    var cidade = response.results[0].locations[0].adminArea5
    var country = response.results[0].locations[0].adminArea3

    fetch(`https://api.pexels.com/v1/search?query=${cidade}`, {
      headers: {
        Authorization:
          '563492ad6f91700001000001e4db8066476a4566b07b474c7b3d6a25'
      }
    })
      .then(response => response.json())
      .then(function (result) {
        $('.imagem').css(
          'background-image',
          `url(${result.photos[0].src.large})`
        )

        /* $('.imagem').attr('src', result.photos[0].src.tiny) */
      })
      .catch(err => console.log(err))

    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${country}&appid=8dc516a9061a5ea2b1d337390600c4d2&units=metric&lang=pt_br`,
      function (data) {
        $('.clima').text(data.weather[0].description)
        $('.umidade').text(data.main.humidity)
        $('.temperatura').text(data.main.temp)
        $('.cidade').text(data.name)
        $('.pais').text(data.sys.country)
        $('.temp-min').text(data.main.temp_min)
        $('.temp-max').text(data.main.temp_max)
        if (data.main.temp >= 25) {
          $('.bg-gradient').css(
            'background',
            'linear-gradient(180deg, rgba(238,112,21,05) 0%, rgba(133,62,12,05)64% , rgba(0,0,0,05) 100%)'
          )
        } else if (data.main.temp >= 15) {
          $('.bg-gradient').css(
            'background',
            'linear-gradient(180deg, rgba(21,238,43,05) 0%, rgba(8,151,22,05)64% , rgba(0,0,0,05) 100%)'
          )
        } else {
          $('.bg-gradient').css(
            'background',
            'linear-gradient(180deg, rgba(0,71,255,05) 0%, rgba(3,47,200,05)64% , rgba(0,0,0,05) 100%)'
          )
        }
      }
      /* $('.country').val(data.sys.country) */
    )
    $.get(urlinputimgauto, function (response) {
      console.log(data.photos)
      console.log(data.photos)
      /* $('.img-principal').attr('src', response.photos[0].src.tiny) */

      $('.imagem').css(
        'background-image',
        `url(${response.photos[0].src.large})`
      )
    })
  })
})

$('.btn-search').click(function () {
  var input = document.getElementById('search').value
  var country = $('.country').val()
  var urlinput = `https://api.openweathermap.org/data/2.5/weather?q=${input},${country}&appid=8dc516a9061a5ea2b1d337390600c4d2&units=metric&lang=pt_br`
  var urlinputimg = {
    url: `https://api.pexels.com/v1/search?query=${input}`,
    headers: {
      Authorization: '563492ad6f91700001000001e4db8066476a4566b07b474c7b3d6a25'
    }
  }
  var promise2 = new Promise(function (resolve, reject) {
    $.get(urlinput, function (data) {
      $('.clima').text(data.weather[0].description)
      $('.umidade').text(data.main.humidity)
      $('.temperatura').text(data.main.temp)
      $('.cidade').text(data.name)
      $('.pais').text(data.sys.country)
      $('.temp-min').text(data.main.temp_min)
      $('.temp-max').text(data.main.temp_max)

      if (data.main.temp >= 25) {
        $('.bg-gradient').css(
          'background',
          'linear-gradient(180deg, rgba(238,112,21,05) 0%, rgba(133,62,12,05)64% , rgba(0,0,0,05) 100%)'
        )
      } else if (data.main.temp >= 15) {
        $('.bg-gradient').css(
          'background',
          'linear-gradient(180deg, rgba(21,238,43,05) 0%, rgba(8,151,22,05)64% , rgba(0,0,0,05) 100%)'
        )
      } else {
        $('.bg-gradient').css(
          'background',
          'linear-gradient(180deg, rgba(0,71,255,05) 0%, rgba(3,47,200,05)64% , rgba(0,0,0,05) 100%)'
        )
      }

      console.log(urlinput)
    })

    $.get(urlinputimg, function (response) {
      console.log(response.photos[0].src.original)
      console.log(response)
      $('.imagem').css(
        'background-image',
        `url(${response.photos[0].src.large})`
      )
    })
  })
})
