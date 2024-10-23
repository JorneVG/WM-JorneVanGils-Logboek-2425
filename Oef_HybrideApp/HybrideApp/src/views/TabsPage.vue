<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Auteurs" href="/tabs/Auteurs">
          <ion-icon aria-hidden="true" :icon="pencil" />
          <ion-label>Auteurs</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Boeken" href="/tabs/Boeken">
          <ion-icon aria-hidden="true" :icon="book" />
          <ion-label>Boeken</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Genres" href="/tabs/Genres">
          <ion-icon aria-hidden="true" :icon="list" />
          <ion-label>Genres</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="About" href="/tabs/About">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>About</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { pencil, book, list, person } from 'ionicons/icons';
</script>