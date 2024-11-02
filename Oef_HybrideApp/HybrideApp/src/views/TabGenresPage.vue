<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Genres</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="genre in genres" :key="genre.GN_ID">
          <ion-label>
            <h2>{{ genre.naam }}</h2>
          </ion-label>
          <ion-button slot="end" @click="bewerkGenre(genre)">Bewerk</ion-button>
          <ion-button slot="end" @click="verwijderGenre(genre.GN_ID)">Verwijder</ion-button>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="nieuwGenre">+</ion-fab-button>
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
            <ion-label>Naam</ion-label>
            <ion-input v-model="huidigGenre.naam"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button @click="slaGenreOp">{{ modalKnop }}</ion-button>
        <ion-button @click="sluitModal">Annuleren</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonModal, IonInput } from '@ionic/vue';

const baseApiAdres = "https://jorne-vg.be/project1/api/";
const genres = ref([]);
const isModalOpen = ref(false);
const modalTitel = ref('');
const modalKnop = ref('');
const huidigGenre = ref({
  naam: ''
});

const fetchGenres = async () => {
  try {
    const response = await fetch(`${baseApiAdres}genres.php/`);
    const data = await response.json();
    genres.value = data.data;
  } catch (error) {
    console.error('Fout bij het ophalen van genres:', error);
  }
};

const openModal = (titel, knopLabel, genre) => {
  modalTitel.value = titel;
  modalKnop.value = knopLabel;
  huidigGenre.value = { ...genre };
  isModalOpen.value = true;
};

const sluitModal = () => {
  isModalOpen.value = false;
};

const slaGenreOp = async () => {
  const url = `${baseApiAdres}genres.php/`;
  const opties = {
    method: huidigGenre.value.GN_ID ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(huidigGenre.value)
  };
  try {
    await fetch(url, opties);
    sluitModal();
    fetchGenres();
  } catch (error) {
    console.error('Fout bij het opslaan van het genre:', error);
  }
};

const verwijderGenre = async (id) => {
  const url = `${baseApiAdres}genres.php/`;
  const opties = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ GN_ID: id })
  };
  try {
    await fetch(url, opties);
    fetchGenres();
  } catch (error) {
    console.error('Fout bij het verwijderen van het genre:', error);
  }
};

const bewerkGenre = (genre) => {
  openModal('Bewerk Genre', 'Opslaan', genre);
};

const nieuwGenre = () => {
  openModal('Nieuw Genre', 'Toevoegen', {
    naam: ''
  });
};

onMounted(() => {
  fetchGenres();
});
</script>
