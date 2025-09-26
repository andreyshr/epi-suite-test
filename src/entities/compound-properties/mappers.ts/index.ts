import type {
  CompoundProperties,
  CompoundPropertiesDto,
} from '@/entities/compound-properties/types';
import { chemicalPropertiesMapper } from './chemical-properties-mapper';
import { logKowMapper } from './logkow-mapper';
import { mpbpMapper } from './mpbp-mapper';
import { biohcwinMapper } from './bioHCwin-mapper';

export function fromDto(dto: CompoundPropertiesDto): CompoundProperties {
  return {
    chemicalProperties: chemicalPropertiesMapper(dto.chemicalProperties),
    propertyCards: [logKowMapper(dto), mpbpMapper(dto), biohcwinMapper(dto)],
  };
}
