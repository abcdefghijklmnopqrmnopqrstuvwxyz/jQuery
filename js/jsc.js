class Coin
{
    constructor(id, symbol, name)
    {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
    }

}

class List
{
    static list = [];

    addToList(coin)
    {
        this.list.push(coin);
    }

    writeDate()
    {
        this.list.forEach(element => {
            console.log(element);
        });
    }
}

function tryServerSatus()
{
    $.get("https://api.coingecko.com/api/v3/ping", function(status){
        if (status = "success")
        {
            $("#status").append("Server status: &nbsp<p>success<p>");
            $("p").css("color", "green");
            getCoinData();
            createTable();
        }
        else
        {
            $("#status").append("Server status: &nbsp<p>down<p>");
            $("p").css("color", "red");
            getCoinData();
            createTable();
        }
    });
}

function getCoinData()
{
    let l = new List;
    $.get("https://api.coingecko.com/api/v3/coins/list", function(data){
        for (let i = 0; i < data.length / 1200; i++)
        {
                l.addToList(new Coin(data[i].id, data[i].symbol, data[i].name));
        }
        return;
    });
    $("#error").append('<div class="alert alert-danger" role="alert">Service currently unaviable, try again later!</div>');
}

function createTable()
{
    List.list.forEach(element => {
        $("#table").append('<tr><th scope="row">' + element.id + '</td><td>' + element.symbol + '</td><td>' + element.name + '</td></tr>');
    });
}


window.onload = tryServerSatus();