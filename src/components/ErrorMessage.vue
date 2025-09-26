<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { LocationQueryValue } from 'vue-router';

interface Props {
  cas?: LocationQueryValue | LocationQueryValue[];
}

defineProps<Props>();
</script>

<template>
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {{
        `EPI Web Suite could not process the provided chemical (CAS: ${cas ?? 'cas is missing'}).`
      }}
    </AlertDescription>
  </Alert>
</template>
