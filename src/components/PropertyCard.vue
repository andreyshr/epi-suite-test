<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import ChemicalPropertiesComp from './ChemicalProperties.vue';
import type { ChemicalProperties, PropertyCard } from '@/entities/compound-properties';

interface Props {
  data: PropertyCard;
  analogs: Map<string, ChemicalProperties>;
  isAnalogsLoading: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['fetch:analogs']);

const isAllAnalogsFetched = computed(() => {
  return props.data.aimAnalogs.every((analog) => props.analogs.has(analog));
});

function onAnalogsButtonClick() {
  if (isAllAnalogsFetched.value) return;
  emit('fetch:analogs', props.data.aimAnalogs);
}
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader>
      <div class="flex">
        <CardTitle><span v-html="data.title"></span></CardTitle>
        <CardDescription class="ml-2">{{ data.description }}</CardDescription>
        <a :href="data.userGuide" target="_blank" class="font-bold text-sm hover:underline ml-auto"
          >User Guide</a
        >
      </div>
    </CardHeader>
    <CardContent>
      <Tabs default-value="summary" class="">
        <TabsList class="h-auto flex-wrap">
          <TabsTrigger v-if="data.summary" value="summary"> Summary </TabsTrigger>
          <TabsTrigger v-if="data.modelDescriptors" value="model-descriptors">
            Model Descriptors
          </TabsTrigger>
          <TabsTrigger v-if="data.modelOutput" value="model-output"> Model Output </TabsTrigger>
          <TabsTrigger v-if="data.aimAnalogs" value="aim-analog"> AIM Analogs </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div class="flex">
            <div class="flex flex-col items-center">
              <div
                v-for="(value, i) in data.summary.values"
                :key="i"
                class="flex flex-col items-center pt-6 mr-8"
              >
                <span
                  class="font-bold text-center text-xs text-gray-500"
                  v-html="value.title"
                ></span>
                <span class="font-bold text-2xl text-blue-800" v-html="value.value"></span>
                <span class="font-bold text-center text-xs text-gray-500">{{
                  value.additionalInfo
                }}</span>
              </div>
            </div>
            <Table class="ml-auto">
              <TableHeader>
                <TableRow>
                  <TableHead
                    v-for="(header, i) in data.summary.table.header"
                    :key="i"
                    class="text-right"
                    >{{ header }}</TableHead
                  >
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(row, i) in data.summary.table.rows" :key="i">
                  <TableCell v-for="(cell, j) in row" :key="j" class="text-right">
                    <span v-if="j === 0" v-html="cell.value"></span>
                    <span v-else>{{ cell.value }}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableCaption v-if="data.summary.table.caption">{{
                data.summary.table.caption
              }}</TableCaption>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="model-descriptors">
          <div v-for="(table, i) in data.modelDescriptors.tables" :key="i">
            <p v-if="table.name" class="font-bold text-blue-800 py-2">{{ table.name }}</p>
            <Table class="ml-auto">
              <TableHeader>
                <TableRow>
                  <TableHead v-for="(header, i) in table.header" :key="i" class="text-right">{{
                    header
                  }}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(row, j) in table.rows" :key="j">
                  <TableCell v-for="(cell, k) in row" :key="k" class="text-right">
                    <span v-if="k === 0" v-html="cell.value"></span>
                    <span v-else>{{ cell.value }}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableCaption v-if="data.modelDescriptors.caption">{{
                data.modelDescriptors.caption
              }}</TableCaption>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="model-output">
          <pre>{{ data.modelOutput }}</pre>
        </TabsContent>

        <TabsContent value="aim-analog">
          <template v-if="data.aimAnalogs.length">
            <div class="flex flex-col md:flex-row gap-2 md:gap-4 p-4">
              <Button
                v-if="!isAllAnalogsFetched"
                :disabled="isAnalogsLoading"
                @click="onAnalogsButtonClick"
                >{{ isAnalogsLoading ? 'Loading' : 'Load Analogs' }}</Button
              >
              <ChemicalPropertiesComp
                v-for="([, analog], i) in analogs"
                :key="i"
                :data="analog"
                class="max-w-full md:max-w-1/3"
              />
            </div>
          </template>
          <div v-else class="flex gap-4 p-4">No analogs</div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>
