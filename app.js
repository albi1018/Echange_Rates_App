window.onload = function () {
    rates.init();
}



class ExchangeRates {
    url = "https://api.nbp.pl/api/exchangerates/tables/a/last/?format=json";
    tBody = document.querySelector("#ratesTable tbody");

    init() {
        this.loadData();
    }

    loadData() {
        fetch(this.url).then((response) => {
            response.json().then((data) => {
                this.parseData(data);
            })
        })
    }

    parseData(data) {
        data = data[0];
        console.log(data);
        this.table = data.table;
        this.date = data.effectiveDate;
        this.no = data.no;
        this.ratesData = data.rates;

        document.querySelector("h3").innerHTML = "Kursy walut na bazie tabeli nr. : " + this.no;

        for (let i in data.rates) {
            this.addRateToTable(data.rates[i])
        }

    }

    addRateToTable(el) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="align-middle code">${el.code}</td>
            <td class="align-middle currency">${el.currency}</td>
            <td class="align-middle mid">${el.mid} zł</td>
        `

        this.tBody.appendChild(tr);
    }

    search () {
        const inputSearch = document.querySelector("input");
        console.log(inputSearch);


        inputSearch.addEventListener("input", () => {
            const val = inputSearch.value.toLowerCase();
            const elem = document.querySelectorAll("tbody tr");
            for (const el of elem) {
                const text = el.querySelector(".currency").innerText;
                const code = el.querySelector(".code").innerText;
                const number = el.querySelector(".mid").innerText;
                if (text.includes(val) || code.toLowerCase().includes(val) || number.includes(val)) {
                    el.style.setProperty("display", "");
                } else {
                    el.style.setProperty("display", "none");
                }
            }
        })
    }
}

const rates = new ExchangeRates();
rates.search();