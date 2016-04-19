var params = {
  Normalized: false,
  NumberOfDays: 365,
  DataPeriod: Day,
  Elements: [
            {
                Symbol: this.symbol,
                Type: "price",
                Params: ["c"] //ohlc, c = close only
            },
            {
                Symbol: this.symbol,
                Type: "volume"
            }
        ]
};

var parameters = {
  parameters: JSON.stringify(params);
}


})
var params = {
        parameters: JSON.stringify( this.getInputParams() )
    }

    $.ajax({
      data: parameters,
