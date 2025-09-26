import type {
  BiohcwDto,
  CompoundPropertiesDto,
  ModelDescriptors,
  PropertyCard,
  Summary,
} from '../types';

export function biohcwinMapper(obj: CompoundPropertiesDto): PropertyCard {
  return {
    title: 'BioHCwin',
    description: 'Hydrocarbon Biodegradation Half-life',
    userGuide: 'https://episuite.dev/EpiWebSuite/#/help/biohcwin',
    summary: summaryMapper(obj.hydrocarbonBiodegradationRate),
    modelDescriptors: modelDescriptorsMapper(obj.hydrocarbonBiodegradationRate),
    modelOutput: modelOutputMapper(obj.hydrocarbonBiodegradationRate),
    aimAnalogs: analogsMapper(obj),
  };
}

function summaryMapper(obj: BiohcwDto): Summary {
  return {
    values: [
      {
        title: `Estimated Half-life`,
        value: obj.estimatedValue?.value?.toFixed(2) ?? 'N/A',
      },
    ],
    table: {
      header: ['', 'Estimated value', 'Experimental values', 'References'],
      rows:
        obj?.experimentalValues?.map((expValue, i) => [
          { value: 'Log K<sub>OW</sub>' },
          { value: i === 0 ? (obj.estimatedValue?.value?.toFixed(2) ?? '') : '' },
          { value: expValue.value.toFixed(2) },
          { value: `${expValue.author} (${expValue.year})` },
        ]) ?? [],
      caption: obj.estimatedValue.model.notes,
    },
  };
}

function modelDescriptorsMapper(obj: BiohcwDto): ModelDescriptors {
  return {
    tables: [
      {
        header: obj.estimatedValue.model.factors.length
          ? ['Value', 'Description', 'Number', 'Coefficient', 'Contribution']
          : [],
        rows: [
          ...obj.estimatedValue.model.factors.map((factor) => [
            { value: factor.type },
            { value: factor.description },
            { value: factor.fragmentCount.toString() },
            { value: factor.coefficient.toFixed(2) },
            { value: factor?.contribution?.toFixed(2) ?? '-' },
          ]),
        ],
      },
    ],
    caption: obj.estimatedValue.model.notes,
  };
}

function modelOutputMapper(obj: BiohcwDto): string {
  return obj.estimatedValue.model.output;
}

function analogsMapper(obj: CompoundPropertiesDto): string[] {
  return obj.analogs ?? [];
}
