import { ref } from 'vue';
import { defineStore } from 'pinia';
import getCompoundProperties from '@/entities/compound-properties/api';
import type { ChemicalProperties, CompoundProperties } from '@/entities/compound-properties/types';
import type { Nullable } from '@/lib/types';

export const useCompoundPropertiesStore = defineStore('compoundProperties', () => {
  const compoundProperties = ref<Nullable<CompoundProperties>>(null);
  const analogs = ref<Map<string, ChemicalProperties>>(new Map());
  const isCompoundPropertiesLoading = ref(false);
  const isAnalogsLoading = ref(false);
  const compoundPropertiesError = ref('');
  const analogsError = ref('');

  async function fetchCompoundProperties(id: string) {
    isCompoundPropertiesLoading.value = true;

    try {
      compoundProperties.value = await getCompoundProperties(id);
    } catch (err) {
      if (err instanceof Error) compoundPropertiesError.value = err.message;
      else compoundPropertiesError.value = 'Unexpected error';
    } finally {
      isCompoundPropertiesLoading.value = false;
    }
  }

  async function fetchAnalogs(ids: string[]) {
    isAnalogsLoading.value = true;
    try {
      const idsForRequest = ids.filter((id) => !analogs.value.has(id));
      const result = await Promise.allSettled(idsForRequest.map((id) => getCompoundProperties(id)));
      result.forEach((elem) => {
        if (elem.status === 'fulfilled')
          analogs.value.set(elem.value.chemicalProperties.cas, elem.value.chemicalProperties);
      });
    } catch (err) {
      if (err instanceof Error) analogsError.value = err.message;
      else analogsError.value = 'Unexpected error';
    } finally {
      isAnalogsLoading.value = false;
    }
  }

  return {
    compoundProperties,
    analogs,
    isCompoundPropertiesLoading,
    isAnalogsLoading,
    compoundPropertiesError,
    fetchCompoundProperties,
    fetchAnalogs,
  };
});
