import {
  UNITS,
  type CompoundPropertiesDto,
  type ModelDescriptors,
  type PropertyCard,
  type Summary,
} from '../types';

export function mpbpMapper(obj: CompoundPropertiesDto): PropertyCard {
  return {
    title: 'MPBP',
    description: 'Melting Point and Boiling Point',
    userGuide: 'https://episuite.dev/EpiWebSuite/#/help/mpbpvp',
    summary: summaryMapper(obj),
    modelDescriptors: modelDescriptorsMapper(obj),
    aimAnalogs: analogsMapper(obj),
  };
}

function summaryMapper(obj: CompoundPropertiesDto): Summary {
  return {
    values: [
      ...obj.meltingPoint.experimentalValues.map((expValue) => ({
        title: `Experimental Melting Point`,
        value: `${expValue.value.toFixed(2)} ${UNITS[expValue.units]}`,
      })),
      ...[
        {
          title: 'Estimated Boiling Point',
          value: `${obj.boilingPoint.estimatedValue.value.toFixed(2)} ${UNITS[obj.boilingPoint.estimatedValue.units]}`,
        },
      ],
    ],
    table: {
      header: ['', 'Estimated Value', 'Experimental Values', 'References'],
      rows: [
        [
          { value: 'Melting Point' },
          { value: obj.meltingPoint.estimatedValue.value.toFixed(2) },
          {
            value: obj.meltingPoint.experimentalValues
              .map((expValue) => expValue.value.toFixed(2))
              .join(' ,'),
          },
          {
            value: obj.meltingPoint.experimentalValues
              .map((expValue) => expValue.author)
              .join(' ,'),
          },
        ],
        [
          { value: 'Boiling Point' },
          { value: obj.boilingPoint.estimatedValue.value.toFixed(2) },
          {
            value: obj.boilingPoint.experimentalValues
              .map((expValue) => expValue.value.toFixed(2))
              .join(' ,'),
          },
          {
            value: obj.boilingPoint.experimentalValues
              .map((expValue) => expValue.author)
              .join(' ,'),
          },
        ],
      ],
    },
  };
}

function modelDescriptorsMapper(obj: CompoundPropertiesDto): ModelDescriptors {
  return {
    tables: [
      {
        name: 'Melting Point (Adapted Joback / Gold-Ogle Methods)',
        header: ['Value', 'Description', 'Number', 'Coefficient', 'Contribution'],
        rows: [
          ...obj.meltingPoint.estimatedValue.model.factors.map((factor) => [
            { value: factor.type },
            { value: factor.description },
            { value: factor.fragmentCount.toString() },
            { value: factor.coefficient.toFixed(2) },
            { value: '-' },
          ]),
        ],
      },
      {
        name: 'Boiling Point (Adapted Stein and Brown Method)',
        header: ['Value', 'Description', 'Number', 'Coefficient', 'Contribution'],
        rows: [
          ...obj.boilingPoint.estimatedValue.model.factors.map((factor) => [
            { value: factor.type },
            { value: factor.description },
            { value: factor.fragmentCount.toString() },
            { value: factor.coefficient.toFixed(2) },
            { value: '-' },
          ]),
        ],
      },
    ],
  };
}

function analogsMapper(obj: CompoundPropertiesDto): string[] {
  return obj.analogs ?? [];
}
