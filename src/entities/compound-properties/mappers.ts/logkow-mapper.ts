import type {
  CompoundPropertiesDto,
  LogKowDto,
  ModelDescriptors,
  PropertyCard,
  Summary,
} from '../types';

export function logKowMapper(obj: CompoundPropertiesDto): PropertyCard {
  return {
    title: 'Log K<sub>OW</sub>',
    description: 'Octanol-Water Partition Coefficient',
    userGuide: 'https://episuite.dev/EpiWebSuite/#/help/kowwin',
    summary: summaryMapper(obj.logKow),
    modelDescriptors: modelDescriptorsMapper(obj.logKow),
    modelOutput: modelOutputMapper(obj.logKow),
    aimAnalogs: analogsMapper(obj),
  };
}

function summaryMapper(obj: LogKowDto): Summary {
  return {
    values: obj.experimentalValues.map((expValue) => ({
      title: `Experimental Log K<sub>OW</sub>`,
      value: expValue.value.toFixed(2),
    })),
    table: {
      header: ['', 'Estimated value', 'Experimental values', 'References'],
      rows: obj.experimentalValues.map((expValue, i) => [
        { value: 'Log K<sub>OW</sub>' },
        { value: i === 0 ? obj.estimatedValue.value.toFixed(2) : '' },
        { value: expValue.value.toFixed(2) },
        { value: `${expValue.author} (${expValue.year})` },
      ]),
      caption: obj.estimatedValue.model.notes,
    },
  };
}

function modelDescriptorsMapper(obj: LogKowDto): ModelDescriptors {
  return {
    tables: [
      {
        header: [
          'Value',
          'Description',
          'Number',
          'Coefficient',
          'Contribution',
          'Training Count',
          'Validation Count',
        ],
        rows: [
          ...obj.estimatedValue.model.factors.map((factor) => [
            { value: factor.type },
            { value: factor.description },
            { value: factor.fragmentCount.toString() },
            { value: factor.coefficient.toFixed(2) },
            { value: factor?.contribution?.toFixed(2) ?? '-' },
            { value: factor?.trainingCount?.toString() ?? '-' },
            { value: factor?.validationCount?.toString() ?? '-' },
          ]),
          ...[
            [
              { value: 'Log K<sub>OW</sub>' },
              { value: '' },
              { value: '' },
              { value: '' },
              { value: '' },
              { value: '' },
              { value: obj.estimatedValue.value.toFixed(2) },
            ],
          ],
        ],
      },
    ],
    caption: obj.estimatedValue.model.notes,
  };
}

function modelOutputMapper(obj: LogKowDto): string {
  return obj.estimatedValue.model.output;
}

function analogsMapper(obj: CompoundPropertiesDto): string[] {
  return obj.logKowAnalogs ?? [];
}
