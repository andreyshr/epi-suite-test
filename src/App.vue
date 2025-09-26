<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Skeleton } from '@/components/ui/skeleton';
import ChemicalProperties from './components/ChemicalProperties.vue';
import PropertyCard from './components/PropertyCard.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import { useCompoundPropertiesStore } from './entities/compound-properties';

const route = useRoute();
const compoundPropertiesStore = useCompoundPropertiesStore();
const {
  compoundProperties,
  analogs,
  isCompoundPropertiesLoading,
  isAnalogsLoading,
  compoundPropertiesError,
} = storeToRefs(compoundPropertiesStore);

watch(
  () => route.query.cas,
  () => {
    const cas = route.query.cas;
    if (!cas) return;
    compoundPropertiesStore.fetchCompoundProperties(cas as string);
  },
);

function onFetchAnalogs(ids: string[]) {
  compoundPropertiesStore.fetchAnalogs(ids);
}
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-0 md:gap-4 w-full max-w-7xl m-auto min-h-dvh py-8 px-2"
  >
    <ErrorMessage
      v-if="compoundPropertiesError"
      :cas="route.query.cas?.toString()"
      class="col-span-1 md:col-span-12 h-24 w-1/2 mx-auto"
    />
    <template v-else>
      <div class="d-flex col-span-1 md:col-span-3">
        <ChemicalProperties
          v-if="!isCompoundPropertiesLoading && compoundProperties?.chemicalProperties"
          :data="compoundProperties.chemicalProperties"
          class="w-full"
        />
        <Skeleton v-else class="w-full h-[500px]" />
      </div>
      <div class="d-flex flex-col col-span-1 md:col-span-9">
        <template v-if="!isCompoundPropertiesLoading && compoundProperties?.propertyCards.length">
          <PropertyCard
            v-for="(card, i) in compoundProperties?.propertyCards"
            @fetch:analogs="onFetchAnalogs"
            :data="card"
            :analogs="analogs"
            :is-analogs-loading="isAnalogsLoading"
            :key="i"
            class="w-full mb-4"
          />
        </template>
        <Skeleton v-else v-for="i in 6" :key="i" class="w-full h-[200px] mb-4" />
      </div>
    </template>
  </div>
</template>
