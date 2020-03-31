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

//Hide table by default
document.getElementsByTagName("table").className = "hide"
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

//Fetching the Nepal Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=Nepal", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "3ada472d03msh2b9f70ac84a7697p1e60abjsn2ef6d2bdfc07"
        }
    })
    .then(response => response.json().then(data => {
        console.log(data);
        // debugger;
        // console.log("Hello");
        nep_total_cases.innerHTML = data.latest_stat_by_country[0].total_cases;
        nep_new_cases.innerHTML = data.latest_stat_by_country[0].new_cases;
        nep_new_death.innerHTML = data.latest_stat_by_country[0].new_deaths;
        nep_total_death.innerHTML = data.latest_stat_by_country[0].total_deaths;
        nep_total_recovered.innerHTML = data.latest_stat_by_country[0].total_recovered;

    }))
    .catch(err => {
        console.log(err);
    });


//Fetching The Case by Country Data 
$(document).on("click", "#refresh", function() {
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "3ada472d03msh2b9f70ac84a7697p1e60abjsn2ef6d2bdfc07"
            }
        })
        .then(response => response.json().then(data => {
            console.log(data)
                //Display table
            document.getElementsByTagName("table").className = "show";
            let countries_stat = data.countries_stat;

            // debugger; 
            //Getting all the country statistic using a loop
            for (let i = 0; i < countries_stat.length; i++) {
                console.log(countries_stat[i]);
                // //Insert status of Nepal
                // if (countries_stat[i].country_name == "Nepal") {
                //     nep_total_cases.innerHTML = countries_stat[i].cases;
                //     nep_new_cases.innerHTML = countries_stat[i].new_cases;
                //     nep_new_death.innerHTML = countries_stat[i].new_deaths;
                //     nep_total_death.innerHTML = countries_stat[i].deaths;
                //     nep_total_recovered.innerHTML = countries_stat[i].total_recovered;
                // }
                //we will start by inserting the new rows inside our table
                let row = table.insertRow(i + 1);
                let country_name = row.insertCell(0);
                let cases = row.insertCell(1);
                let deaths = row.insertCell(2);
                let active = row.insertCell(3);
                let serious_critical = row.insertCell(4);
                let recovered_per_country = row.insertCell(5);
                let map = row.insertCell(6);
                country_name.innerHTML = countries_stat[i].country_name;
                cases.innerHTML = countries_stat[i].cases;
                deaths.innerHTML = countries_stat[i].deaths;
                active.innerHTML = countries_stat[i].active_cases;
                serious_critical.innerHTML = countries_stat[i].serious_critical;
                recovered_per_country.innerHTML = countries_stat[i].total_recovered;
                //Add button to view map
                map_button = document.createElement("button");
                map_button.className = "ui-btn maps_button"
                map_button.innerHTML = "View Map"
                    //Append the button
                map.appendChild(map_button);
                //Add event listener
                map_button.addEventListener("click", function() { console.log(`${countries_stat[i].country_name} Button is clicked`) })

            }
        }))
        .catch(err => {
            console.log(err);
        })
});