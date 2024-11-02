<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">About</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content :fullscreen="true" class="ion-padding">
        <ion-card class="ion-text-center">
          <ion-avatar class="ion-margin">
            <img src="../../public/pfp.jpg" alt="Profile Picture">
          </ion-avatar>
          <ion-card-content>
            <ion-title>Over deze app</ion-title>
            <p>Deze app is gemaakt door Jorne Van Gils, een 19 jarige Toegepaste Informatica student bij Odisee Hogeschool.</p>
            <p><strong>Toelichting app:</strong> In deze app kunnen we heel makkelijk al onze boeken beheren, bij deze boeken horen natuurlijk ook auteurs en genres die heel makkelijk voor alle boeken aangepast kunnen worden. Ook kunnen we heel makkelijk nieuwe boeken, auteurs en genres toevoegen en verwijderen!</p>
          </ion-card-content>
        </ion-card>
      </ion-content>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar, IonCardContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
