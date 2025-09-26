<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChemicalProperties } from '@/entities/compound-properties';

interface Props {
  data: ChemicalProperties;
}

defineProps<Props>();
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>
        <a :href="data.url" class="hover:underline">{{ data.name }}</a>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="mb-8">
        <img :src="data.img" :alt="data.name" class="max-w-full h-[100px]" />
      </div>
      <div class="flex flex-col mb-4">
        <span class="text-sm text-gray-600">Systematic Name</span>
        <span>{{ data.systematicName }}</span>
      </div>
      <div class="flex flex-col mb-4">
        <span class="text-sm text-gray-600">CAS RN</span>
        <span>{{ data.cas }}</span>
      </div>
      <div class="flex flex-col mb-4">
        <span class="text-sm text-gray-600">Molecular Formula</span>
        <span v-html="data.molecularFormulaHtml"></span>
      </div>
      <div class="flex flex-col mb-4">
        <span class="text-sm text-gray-600">Molecular Mass</span>
        <span>{{ data.molecularWeight }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm text-gray-600">SMILES</span>
        <span class="break-all">{{ data.smiles }}</span>
      </div>
    </CardContent>
  </Card>
</template>
