<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  cas?: string;
}

defineProps<Props>();
</script>

<template>
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {{ `EPI Web Suite could not process the provided chemical (CAS: ${cas}).` }}
    </AlertDescription>
  </Alert>
</template>
