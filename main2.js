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
    var $symbol = $('<p>').text("Symbol: " + z)
    $card.append($name, $exchange, $symbol).attr("data-toggle", "modal").attr("data-target", ".bs-modal-sm").attr("data-symbol", z);
    return $card
}

function makeStockQuote(Q) {
    console.log(Q)
    var s = Q.Symbol
    var x = Q.LastPrice
    var y = Q.Name
    var z = Q.ChangePercentYTD
    var xx = Q.MarketCap
    var $tr = $('<tr>').addClass('stock').text(s);
    var $td = $('<tr>').attr("scope", "row").addClass('stock').attr("data-symbol", s).appendTo($tr)
    var $name = $('<td>').text(y).appendTo($tr);
    var $price = $('<td>').text(x).appendTo($tr);
    var $market = $('<td>').text(xx).appendTo($tr);
    var $change = $('<td>').text(z).appendTo($tr);
    if (localStorage.Fav == 0) {
      var list = [];
      x.push(list)
      var lists = JSON.stringify(lister)
      localStorage.Fav = lists
    } else {
      var list = JSON.parse(localStorage.Fav)
      x.push(list)
      var lists = JSON.stringify(list)
      localStorage.Fav = lists

    }

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

function charter(e) {
    e.stopPropagation();
    var stock = $(this).data(e, "symbol")
    var stocked = stock.data("symbol")
        // console.log("stock: ", stock, " stocked: ", stocked)

    var params = {
        Normalized: false,
        NumberOfDays: 365,
        DataPeriod: "Day",
        Elements: [{
            Symbol: "AAPL",
            Type: "price",
            Params: ["ohlc"]
        }, {
            Symbol: "AAPL",
            Type: "volume"
        }]
    };
    var Parameters = {
        parameters: JSON.stringify(params)
    };

    $.ajax('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp', {
        jsonp: "parameters",
        dataType: 'jsonp',
        data: Parameters,
        success: function(json) {
            if (!json || json.Message) {
                console.error("Error: ", json.Message);
                return;
            }
            this.render(json);
        },
        error: function(response, txtStatus) {
            console.log(response, txtStatus)
        }

    })
}

function oldMaker () {
  var oldStocks = JSON.parse(localStorage.Fav);
  for (var i = 0; i < oldStocks.length; i++) {
    var named = oldStocks[i]
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

}
//         .done(function(list) {
//             var listed = makeStockQuote(list)
//             console.log(list)
//             $('#chartMake').append(listed)
//
//         })
//         .fail(function(err) {
//             console.log(err)
//         });
// }



$(document).ready(function() {
  if (!localStorage.Fav) {localStorage.Fav = []}
  if (localStorage.Fav != 0) {
    oldMaker();
  }
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
    $('#innerStocks').on("dblclick", ".stock", charter)


});
