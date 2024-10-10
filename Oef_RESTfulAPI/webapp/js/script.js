(function () {
	"use strict";
	/*jslint browser: true*/
	/*jslint devel: true*/
	let baseApiAddress = "https://jorne-vg.be/project1/api/";
	/* Vorige lijn aanpassen naar de locatie op jouw domein! */

	let alertEl = document.getElementById("tableBox2");
	let opties = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "omit" // include, *same-origin, omit
		/* Opgelet : volgende headers niet toevoegen :
			JSON triggert de pre-flight mode, waardoor de toegang op
			deze manier niet meer zal lukken. Tenzij daar in de API expliciet
		rekening is met gehouden ...
		*/
		/*, headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}*/
	};

	function getApiAuteurs() {
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "auteurs.php/";

		// Deze request werkt via GET
		opties.method = "GET";
		// Een GET of HEAD method geef je geen body mee		
		opties.body = null;

		// test de api
		fetch(url, opties)
			.then(function (response) {
				return response.json();
			})
			.then(function (responseData) {
				// de verwerking van de data
				var list = responseData.data;
				console.log(list);

				if (list.length > 0) {
					let tLijst = '';
					for (let i = 0; i < list.length; i++) {
						tLijst += `<tr><td>${list[i].AU_ID}</td><td>${list[i].voornaam}</td><td>${list[i].familienaam}</td><td>${list[i].geboortejaar}</td></tr>`;
					}
					document.getElementById('tableBody1').innerHTML = tLijst;
				} else {
					alerter("Servertijd kon niet opgevraagd worden");
				}

			})
			.catch(function (error) {
				// verwerk de fout
				alertEl.innerHTML = "fout : " + error;
			});
	}
	function getApiBoeken() {
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "boeken.php/";

		// Deze request werkt via GET
		opties.method = "GET";
		// Een GET of HEAD method geef je geen body mee		
		opties.body = null;

		// test de api
		fetch(url, opties)
			.then(function (response) {
				return response.json();
			})
			.then(function (responseData) {
				// de verwerking van de data
				var list = responseData.data;
				console.log(list);

				if (list.length > 0) {
					let tLijst = '';
					for (let i = 0; i < list.length; i++) {
						tLijst += `<tr><td>${list[i].BK_ID}</td><td>${list[i].titel}</td><td>${list[i].voornaam} ${list[i].familienaam}</td><td>${list[i].naam}</td><td>${list[i].omschrijving}</td><td>${list[i].code}</td></tr>`;
					}
					document.getElementById('tableBody2').innerHTML = tLijst;
				} else {
					alerter("Servertijd kon niet opgevraagd worden");
				}

			})
			.catch(function (error) {
				// verwerk de fout
				alertEl.innerHTML = "fout : " + error;
			});
	}
	function getApiGenres() {
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "genres.php/";

		// Deze request werkt via GET
		opties.method = "GET";
		// Een GET of HEAD method geef je geen body mee		
		opties.body = null;

		// test de api
		fetch(url, opties)
			.then(function (response) {
				return response.json();
			})
			.then(function (responseData) {
				// de verwerking van de data
				var list = responseData.data;
				console.log(list);

				if (list.length > 0) {
					let tLijst = '';
					for (let i = 0; i < list.length; i++) {
						tLijst += `<tr><td>${list[i].GN_ID}</td><td>${list[i].naam}</td></tr>`;
					}
					document.getElementById('tableBody3').innerHTML = tLijst;
				} else {
					alerter("Servertijd kon niet opgevraagd worden");
				}

			})
			.catch(function (error) {
				// verwerk de fout
				alertEl.innerHTML = "fout : " + error;
			});
	}

	function verwijderApiAuteurs() {
		let auteurId = document.getElementById("txtVerwijderAuteur").value;
		if (!auteurId) {
			alert("Vul een ID in!");
			return;
		}
		let url = baseApiAddress + "auteurs.php/";
		let opties = {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ AU_ID: auteurId })
		};
		fetch(url, opties)
			.then(response => response.json())
			.then(responseData => {
				if (responseData.status === 200) {
					alert("Auteur succesvol verwijderd.");
				} else {
					alert("Fout bij verwijderen: " + responseData.message);
				}
			})
			.catch(error => alert("Verbindingsfout: " + error));
	}

	function verwijderApiBoeken() {
		let boekId = document.getElementById("txtVerwijderBoek").value;
		if (!boekId) {
			alert("Vul een ID in!");
			return;
		}
		let url = baseApiAddress + "boeken.php/";
		let opties = {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ BK_ID: boekId })
		};
		fetch(url, opties)
			.then(response => response.json())
			.then(responseData => {
				if (responseData.status === 200) {
					alert("Boek succesvol verwijderd.");
				} else {
					alert("Fout bij verwijderen: " + responseData.message);
				}
			})
			.catch(error => alert("Verbindingsfout: " + error));
	}

	function verwijderApiGenres() {
		let genreId = document.getElementById("txtVerwijderGenre").value;
		if (!genreId) {
			alert("Vul een ID in!");
			return;
		}
		let url = baseApiAddress + "genres.php/";
		let opties = {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ GN_ID: genreId })
		};
		fetch(url, opties)
			.then(response => response.json())
			.then(responseData => {
				if (responseData.status === 200) {
					alert("Genre succesvol verwijderd.");
				} else {
					alert("Fout bij verwijderen: " + responseData.message);
				}
			})
			.catch(error => alert("Verbindingsfout: " + error));
	}

	function bewerkApiAuteurs() {
		let auteurId = document.getElementById("txtBewerkAuteurId").value;
		let voornaam = document.getElementById("txtBewerkAuteurVoornaam").value;
		let familienaam = document.getElementById("txtBewerkAuteurFamilienaam").value;
		let geboortejaar = document.getElementById("txtBewerkAuteurGeboortejaar").value;

		if (!auteurId || !voornaam || !familienaam || !geboortejaar) {
			alert("Vul alle velden in!");
			return;
		}

		let url = baseApiAddress + "auteurs.php/";
		let opties = {
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				AU_ID: auteurId,
				voornaam: voornaam,
				familienaam: familienaam,
				geboortejaar: geboortejaar
			})
		};

		fetch(url, opties)
			.then(response => response.json())
			.then(responseData => {
				if (responseData.status === 200) {
					alert("Auteur succesvol bewerkt.");
				} else {
					alert("Fout bij bewerken: " + responseData.message);
				}
			})
			.catch(error => alert("Verbindingsfout: " + error));
	}

	function bewerkApiBoeken() {
		let boekId = document.getElementById("txtBewerkBoekId").value;
		let auteurId = document.getElementById("txtBewerkBoekAuteurId").value;
		let genreId = document.getElementById("txtBewerkBoekGenreId").value;
		let titel = document.getElementById("txtBewerkBoekTitel").value;
		let code = document.getElementById("txtBewerkBoekCode").value;
		let omschrijving = document.getElementById("txtBewerkBoekOmschrijving").value;

		if (!boekId || !auteurId || !genreId || !titel || !code || !omschrijving) {
			alert("Vul alle velden in!");
			return;
		}

		let url = baseApiAddress + "boeken.php/";
		let opties = {
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				BK_ID: boekId,
				BK_AU_ID: auteurId,
				BK_GN_ID: genreId,
				titel: titel,
				code: code,
				omschrijving: omschrijving
			})
		};

		fetch(url, opties)
			.then(response => response.json())
			.then(responseData => {
				if (responseData.status === 200) {
					alert("Boek succesvol bewerkt.");
				} else {
					alert("Fout bij bewerken: " + responseData.message);
				}
			})
			.catch(error => alert("Verbindingsfout: " + error));
	}

	function bewerkApiGenres() {
		let genreId = document.getElementById("txtBewerkGenreId").value;
		let genreNaam = document.getElementById("txtBewerkGemreNaam").value;

		if (!genreId || !genreNaam) {
			alert("Vul alle velden in!");
			return;
		}

		let url = baseApiAddress + "genres.php/";
		let opties = {
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				GN_ID: genreId,
				naam: genreNaam
			})
		};

		fetch(url, opties)
			.then(response => response.json())
			.then(responseData => {
				if (responseData.status === 200) {
					alert("Genre succesvol bewerkt.");
				} else {
					alert("Fout bij bewerken: " + responseData.message);
				}
			})
			.catch(error => alert("Verbindingsfout: " + error));
	}

	function nieuwApiAuteurs() {
		// Haal de waarden op uit de inputvelden voor auteur
		let voornaam = document.getElementById("txtNieuwAuteurVoornaam").value;
		let familienaam = document.getElementById("txtNieuwAuteurFamilienaam").value;
		let geboortejaar = document.getElementById("txtNieuwAuteurGeboortejaar").value;

		// Kijk of alle velden zijn ingevuld
		if (!voornaam || !familienaam || !geboortejaar) {
			alert("Vul alle velden in!");
			return;
		}

		let url = baseApiAddress + "auteurs.php/";

		// Stel de opties voor de POST request
		let opties = {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "omit",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				voornaam: voornaam,
				familienaam: familienaam,
				geboortejaar: geboortejaar
			})
		};

		// Verstuur de fetch request
		fetch(url, opties)
			.then(function (response) {
				return response.json();
			})
			.then(function (responseData) {
				// Check of het aanmaken succesvol was
				if (responseData.status === 200) {
					alert("Auteur succesvol toegevoegd met ID: " + responseData.AU_ID);
				} else {
					alert("Fout bij toevoegen: " + responseData.message);
				}
			})
			.catch(function (error) {
				alert("Fout bij verbinding: " + error);
			});
	}
	function nieuwApiBoeken() {
		// Haal de waarden op uit de inputvelden
		let auteurId = document.getElementById("txtNieuwBoekAuteurId").value;
		let genreId = document.getElementById("txtNieuwBoekGenreId").value;
		let titel = document.getElementById("txtNieuwBoekTitel").value;
		let code = document.getElementById("txtNieuwBoekCode").value;
		let omschrijving = document.getElementById("txtNieuwBoekOmschrijving").value;

		// Kijk of alle velden zijn ingevuld
		if (!auteurId || !genreId || !titel || !code || !omschrijving) {
			alert("Vul alle velden in!");
			return;
		}
		let url = baseApiAddress + "boeken.php/";

		// Stel de opties voor de POST request
		let opties = {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "omit",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				BK_AU_ID: auteurId,
				BK_GN_ID: genreId,
				titel: titel,
				code: code,
				omschrijving: omschrijving
			})
		};

		// Verstuur de fetch request
		fetch(url, opties)
			.then(function (response) {
				return response.json();
			})
			.then(function (responseData) {
				// Check of het aanmaken succesvol was
				if (responseData.status === 200) {
					alert("Boek succesvol toegevoegd met ID: " + responseData.BK_ID);
				} else {
					alert("Fout bij toevoegen: " + responseData.message);
				}
			})
			.catch(function (error) {
				alert("Fout bij verbinding: " + error);
			});
	}
	function nieuwApiGenres() {
		// Haal de waarden op uit de inputvelden voor genre
		let genreNaam = document.getElementById("txtNieuwGemreNaam").value;

		// Kijk of het veld is ingevuld
		if (!genreNaam) {
			alert("Vul het veld in!");
			return;
		}

		let url = baseApiAddress + "genres.php/";

		// Stel de opties voor de POST request
		let opties = {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "omit",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				naam: genreNaam
			})
		};

		// Verstuur de fetch request
		fetch(url, opties)
			.then(function (response) {
				return response.json();
			})
			.then(function (responseData) {
				// Check of het aanmaken succesvol was
				if (responseData.status === 200) {
					alert("Genre succesvol toegevoegd met ID: " + responseData.GN_ID);
				} else {
					alert("Fout bij toevoegen: " + responseData.message);
				}
			})
			.catch(function (error) {
				alert("Fout bij verbinding: " + error);
			});
	}


	function updateAll() {
		getApiAuteurs();
		getApiBoeken();
		getApiGenres();
	}

	// EventListeners
	document.getElementById("btnGetData").addEventListener("click", function () {
		updateAll();
	});

	document.getElementById("btnVerwijderAuteur").addEventListener("click", function () {
		verwijderApiAuteurs();
		updateAll();
	});
	document.getElementById("btnVerwijderBoek").addEventListener("click", function () {
		verwijderApiBoeken();
		updateAll();
	});
	document.getElementById("btnVerwijderGenre").addEventListener("click", function () {
		verwijderApiGenres();
		updateAll();
	});

	document.getElementById("btnBewerkAuteur").addEventListener("click", function () {
		bewerkApiAuteurs();
		updateAll();
	});
	document.getElementById("btnBewerkBoek").addEventListener("click", function () {
		bewerkApiBoeken();
		updateAll();
	});
	document.getElementById("btnBewerkGenre").addEventListener("click", function () {
		bewerkApiGenres();
		updateAll();
	});

	document.getElementById("btnNieuwAuteur").addEventListener("click", function () {
		nieuwApiAuteurs();
		updateAll();
	});
	document.getElementById("btnNieuwBoek").addEventListener("click", function () {
		nieuwApiBoeken();
		updateAll();
	});
	document.getElementById("btnNieuwGenre").addEventListener("click", function () {
		nieuwApiGenres();
		updateAll();
	});

	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();

