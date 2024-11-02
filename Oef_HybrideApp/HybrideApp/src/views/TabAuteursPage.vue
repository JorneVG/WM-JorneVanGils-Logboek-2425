<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Auteurs</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="auteur in auteurs" :key="auteur.AU_ID">
          <ion-label>
            <h2>{{ auteur.voornaam }} {{ auteur.familienaam }}</h2>
            <p>{{ auteur.geboortejaar }}</p>
          </ion-label>
          <ion-button slot="end" @click="bewerkAuteur(auteur)">Bewerk</ion-button>
          <ion-button slot="end" @click="verwijderAuteur(auteur.AU_ID)">Verwijder</ion-button>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="nieuwAuteur">+</ion-fab-button>
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
            <ion-label>Voornaam</ion-label>
            <ion-input v-model="huidigAuteur.voornaam"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Familienaam</ion-label>
            <ion-input v-model="huidigAuteur.familienaam"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Geboortejaar</ion-label>
            <ion-input v-model="huidigAuteur.geboortejaar"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button @click="slaAuteurOp">{{ modalKnop }}</ion-button>
        <ion-button @click="sluitModal">Annuleren</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonModal, IonInput } from '@ionic/vue';

const baseApiAdres = "https://jorne-vg.be/project1/api/";
const auteurs = ref([]);
const isModalOpen = ref(false);
const modalTitel = ref('');
const modalKnop = ref('');
const huidigAuteur = ref({
  voornaam: '',
  familienaam: '',
  geboortejaar: ''
});

const fetchAuteurs = async () => {
  try {
    const response = await fetch(`${baseApiAdres}auteurs.php/`);
    const data = await response.json();
    auteurs.value = data.data;
  } catch (error) {
    console.error('Fout bij het ophalen van auteurs:', error);
  }
};

const openModal = (titel, knopLabel, auteur) => {
  modalTitel.value = titel;
  modalKnop.value = knopLabel;
  huidigAuteur.value = { ...auteur };
  isModalOpen.value = true;
};

const sluitModal = () => {
  isModalOpen.value = false;
};

const slaAuteurOp = async () => {
  const url = `${baseApiAdres}auteurs.php/`;
  const opties = {
    method: huidigAuteur.value.AU_ID ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(huidigAuteur.value)
  };
  try {
    await fetch(url, opties);
    sluitModal();
    fetchAuteurs();
  } catch (error) {
    console.error('Fout bij het opslaan van de auteur:', error);
  }
};

const verwijderAuteur = async (id) => {
  const url = `${baseApiAdres}auteurs.php/`;
  const opties = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ AU_ID: id })
  };
  try {
    await fetch(url, opties);
    fetchAuteurs();
  } catch (error) {
    console.error('Fout bij het verwijderen van de auteur:', error);
  }
};

const bewerkAuteur = (auteur) => {
  openModal('Bewerk Auteur', 'Opslaan', auteur);
};

const nieuwAuteur = () => {
  openModal('Nieuwe Auteur', 'Toevoegen', {
    voornaam: '',
    familienaam: '',
    geboortejaar: ''
  });
};

onMounted(() => {
  fetchAuteurs();
});
</script>
