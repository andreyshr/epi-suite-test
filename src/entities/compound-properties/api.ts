import { fromDto } from './mappers.ts';
import type { CompoundProperties } from './types.ts';

export default async function getCompoundProperties(cas: string): Promise<CompoundProperties> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${cas}`);
  const dto = await response.json();

  return fromDto(dto);
}
