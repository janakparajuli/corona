//Decalring the Different Variable and Objects
let new_cases = document.getElementById("new_case");
let new_death = document.getElementById("new_death");
let total_death = document.getElementById("total_death");
let total_recovered = document.getElementById("total_recovered");
let total_cases = document.getElementById("total_cases");
let table = document.getElementById('countries_stat')
let nep_new_cases = document.getElementById("nep_new_case");
let nep_new_death = document.getElementById("nep_new_death");
let nep_total_death = document.getElementById("nep_total_death");
let nep_total_recovered = document.getElementById("nep_total_recovered");
let nep_total_cases = document.getElementById("nep_total_cases");
// Fetching the Data from the server

//Fetching the World Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "3ada472d03msh2b9f70ac84a7697p1e60abjsn2ef6d2bdfc07"
        }
    })
    .then(response => response.json().then(data => {
        console.log(data);
        // console.log("Hello");
        total_cases.innerHTML = data.total_cases;
        new_cases.innerHTML = data.new_cases;
        new_death.innerHTML = data.new_deaths;
        total_death.innerHTML = data.total_deaths;
        total_recovered.innerHTML = data.total_recovered;

    })).catch(err => {
        console.log(err);
    });

//Fetching The Case by Country Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "3ada472d03msh2b9f70ac84a7697p1e60abjsn2ef6d2bdfc07"
        }
    })
    .then(response => response.json().then(data => {
        console.log(data)
        let countries_stat = data.countries_stat;
        nep_total_cases.innerHTML = countries_stat[174].cases;
        nep_new_cases.innerHTML = countries_stat[174].new_cases;
        nep_new_death.innerHTML = countries_stat[174].new_deaths;
        nep_total_death.innerHTML = countries_stat[174].deaths;
        nep_total_recovered.innerHTML = countries_stat[174].total_recovered;
        // debugger;
        //Getting all the country statistic using a loop
        for (let i = 0; i < countries_stat.length; i++) {
            console.log(countries_stat[i]);
            //we will start by inserting the new rows inside our table
            let row = table.insertRow(i + 1);
            let country_name = row.insertCell(0);
            let cases = row.insertCell(1);
            let deaths = row.insertCell(2);
            let active = row.insertCell(3);
            let serious_critical = row.insertCell(4);
            let recovered_per_country = row.insertCell(5);
            country_name.innerHTML = countries_stat[i].country_name;
            cases.innerHTML = countries_stat[i].cases;
            deaths.innerHTML = countries_stat[i].deaths;
            active.innerHTML = countries_stat[i].active_cases;
            serious_critical.innerHTML = countries_stat[i].serious_critical;
            recovered_per_country.innerHTML = countries_stat[i].total_recovered;

        }
    }))
    .catch(err => {
        console.log(err);
    });