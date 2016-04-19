$(document).ready(function() {
  // $('body').append($overlay, $modal);
    $("div").on("mouseover", ".card", function() {
        // console.log( $( this ).text() );
        $(this).removeClass('animated jello bounceInLeft over')
        $(this).addClass('animated jello over')
    });
    $("div").on("animationend", ".card", function(e) {
        $(this).removeClass('jello bounceInLeft over')
    })
    $('#doit').on('click', looker)
    $("div").on("click", ".card", picker)
    $('#innerStocks').on("dblclick", ".stock", remover)
});

function test(d) {
  console.log(d)
}

function makeStockCard(symb) {
  var $card = $('<div>').addClass('card');
  var x = symb.Exchange
  var y = symb.Name
  var z = symb.Symbol
  var $name = $('<p>').text("NAME: " + y);
  var $exchange = $('<p>').text("Exchange: " + x);
  var $symbol = $('<p>').text("MarketCap: " + z)
  $card.append($name, $exchange, $symbol).attr("data-toggle", "modal").attr("data-target", ".bs-modal-sm").attr("data-symbol", z);
  return $card
}
function makeStockQuote(Q) {
  console.log(Q)
  var $stock = $('<tr>').addClass('stock');
  var s = Q.Symbol
  var x = Q.LastPrice
  var y = Q.Name
  var z = Q.ChangePercentYTD
  var xx = Q.MarketCap
var $tr = $('<tr>').attr("scope", "row").text(s).addClass('stock')
  var $name = $('<td>').text(y).appendTo($tr);
  var $price = $('<td>').text(x).appendTo($tr);
  var $market = $('<td>').text(xx).appendTo($tr);
  var $change = $('<td>').text(z).appendTo($tr);
  return $tr
}
function looker() {
  var query = $('#mySym').val();
  $.getJSON(`http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=${query}&callback=?`)
  .done(function(list) {
    console.log(list)
    var results = list.map(makeStockCard)
    $('.display').append(results)

  })
  .fail(function(err) {
    console.log(err)
  });
}
function picker(e) {
  e.stopPropagation();
var name = $(this).data(e, "symbol")
var named = name.data("symbol");
  $.getJSON(`http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=${named}&callback=?`)
  .done(function(list) {
var listed = makeStockQuote(list)
console.log(list)
$('#innerStocks').append(listed)

  })
  .fail(function(err) {
    console.log(err)
  });
}
function remover(stock) {
  console.log(stock)
  $(stock).hide();
}
function makeFavorites() {

var $tr = $('<tr>').attr("class", "stock")
var $th = $('<th>').attr("scope", "row").text(symbol).appendTo($tr);

}
//
//
//
//
// var modal = (function(){
//     var
//     method = {},
//     $overlay,
//     $modal,
//     $content,
//     $close;
//
//     // Append the HTML
//
//     // Center the modal in the viewport
//     method.center = function () {};
//
//     // Open the modal
//     method.open = function (settings) {};
//
//     // Close the modal
//     method.close = function () {};
//
//     return method;
// }());
//
// $overlay = $('<div id="overlay"></div>');
// $modal = $('<div id="modal"></div>');
// $content = $('<div id="content"></div>');
// $close = $('<a id="close" href="#">close</a>');
//
// $modal.hide();
// $overlay.hide();
// $modal.append($content, $close);
// method.center = function () {
//     var top, left;
//
//     top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
//     left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
//
//     $modal.css({
//         top:top + $(window).scrollTop(),
//         left:left + $(window).scrollLeft()
//     });
// };
// method.open = function (settings) {
//     $content.empty().append(settings.content);
//
//     $modal.css({
//         width: settings.width || 'auto',
//         height: settings.height || 'auto'
//     })
//
//     method.center();
//
//     $(window).bind('resize.modal', method.center);
//
//     $modal.show();
//     $overlay.show();
// };
// method.close = function () {
//     $modal.hide();
//     $overlay.hide();
//     $content.empty();
//     $(window).unbind('resize.modal');
// };
// $close.click(function(e){
//     e.preventDefault();
//     method.close();
// });
