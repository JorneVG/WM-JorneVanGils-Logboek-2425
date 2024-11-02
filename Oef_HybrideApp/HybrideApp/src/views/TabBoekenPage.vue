<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Boeken</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Boeken</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="book in boeken" :key="book.BK_ID">
          <ion-label>
            <h2>{{ book.titel }} - ({{ book.code }})</h2>
            <p>{{ book.omschrijving }}</p>
            <p>{{ getAuteurNaam(book.BK_AU_ID) }} - {{ getGenreNaam(book.BK_GN_ID) }}</p>
          </ion-label>
          <ion-button slot="end" @click="bewerkBoek(book)">Bewerk</ion-button>
          <ion-button slot="end" @click="verwijderBoek(book.BK_ID)">Verwijder</ion-button>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button style="font-size: 24px;" @click="nieuwBoek">+</ion-fab-button>
      </ion-fab>
    </ion-content>

    <ion-modal :is-open="isModalOpen">
      <ion-content>
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ modalTitel }}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-list>
          <ion-item>
            <ion-label>Titel</ion-label>
            <ion-input v-model="huidigBoek.titel"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Auteur</ion-label>
            <ion-select v-model="huidigBoek.BK_AU_ID">
              <ion-select-option v-for="auteur in auteurs" :key="auteur.AU_ID" :value="auteur.AU_ID">
                {{ auteur.voornaam }} {{ auteur.familienaam }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Genre</ion-label>
            <ion-select v-model="huidigBoek.BK_GN_ID">
              <ion-select-option v-for="genre in genres" :key="genre.GN_ID" :value="genre.GN_ID">
                {{ genre.naam }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Omschrijving</ion-label>
            <ion-textarea v-model="huidigBoek.omschrijving"></ion-textarea>
          </ion-item>
          <ion-item>
            <ion-label>Code</ion-label>
            <ion-input v-model="huidigBoek.code"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button @click="slaBoekOp">{{ modalKnop }}</ion-button>
        <ion-button @click="sluitModal">Annuleren</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonModal, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/vue';
import { ref, onMounted } from 'vue';

const baseApiAdres = "https://jorne-vg.be/project1/api/";
const boeken = ref([]);
const auteurs = ref([]);
const genres = ref([]);
const isModalOpen = ref(false);
const modalTitel = ref('');
const modalKnop = ref('');
const huidigBoek = ref({
  titel: '',
  BK_AU_ID: null,
  BK_GN_ID: null,
  omschrijving: '',
  code: ''
});

const fetchBoeken = async () => {
  try {
    const response = await fetch(`${baseApiAdres}boeken.php/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit'
    });
    const data = await response.json();
    boeken.value = data.data;
  } catch (error) {
    console.error('Fout bij het ophalen van boeken:', error);
  }
};

const fetchAuteurs = async () => {
  try {
    const response = await fetch(`${baseApiAdres}auteurs.php/`);
    const data = await response.json();
    auteurs.value = data.data;
  } catch (error) {
    console.error('Fout bij het ophalen van auteurs:', error);
  }
};

const fetchGenres = async () => {
  try {
    const response = await fetch(`${baseApiAdres}genres.php/`);
    const data = await response.json();
    genres.value = data.data;
  } catch (error) {
    console.error('Fout bij het ophalen van genres:', error);
  }
};

const getAuteurNaam = (auteurID) => {
  const auteur = auteurs.value.find(a => a.AU_ID === auteurID);
  return auteur ? `${auteur.voornaam} ${auteur.familienaam}` : 'Onbekend';
};

const getGenreNaam = (genreID) => {
  const genre = genres.value.find(g => g.GN_ID === genreID);
  return genre ? genre.naam : 'Onbekend';
};

const openModal = (titel, knopLabel, boek) => {
  modalTitel.value = titel;
  modalKnop.value = knopLabel;
  huidigBoek.value = { ...boek };
  isModalOpen.value = true;
};

const sluitModal = () => {
  isModalOpen.value = false;
};

const slaBoekOp = async () => {
  const url = `${baseApiAdres}boeken.php/`;
  const opties = {
    method: huidigBoek.value.BK_ID ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(huidigBoek.value)
  };
  try {
    const response = await fetch(url, opties);
    const data = await response.json();
    console.log('Boek opgeslagen:', data);
    sluitModal();
    fetchBoeken();
  } catch (error) {
    console.error('Fout bij het opslaan van het boek:', error);
  }
};

const verwijderBoek = async (id) => {
  const url = `${baseApiAdres}boeken.php/`;
  const opties = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ BK_ID: id })
  };
  try {
    const response = await fetch(url, opties);
    const data = await response.json();
    console.log('Boek verwijderd:', data);
    fetchBoeken();
  } catch (error) {
    console.error('Fout bij het verwijderen van het boek:', error);
  }
};

const bewerkBoek = (boek) => {
  openModal('Bewerk Boek', 'Opslaan', boek);
};

const nieuwBoek = () => {
  openModal('Nieuw Boek', 'Toevoegen', {
    titel: '',
    BK_AU_ID: null,
    BK_GN_ID: null,
    omschrijving: '',
    code: ''
  });
};

onMounted(() => {
  fetchBoeken();
  fetchAuteurs();
  fetchGenres();
});
</script>
