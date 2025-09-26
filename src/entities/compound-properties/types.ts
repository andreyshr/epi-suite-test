import type { Nullable } from '../../lib/types';

export interface CompoundProperties {
  chemicalProperties: ChemicalProperties;
  propertyCards: PropertyCard[];
}

export interface PropertyCard {
  title: string;
  description: string;
  userGuide: string;
  summary: Summary;
  modelDescriptors: ModelDescriptors;
  modelOutput?: string;
  aimAnalogs: string[];
}

export interface ChemicalProperties {
  name: string;
  systematicName: Nullable<string>;
  cas: string;
  molecularWeight: string;
  molecularFormulaHtml: string;
  smiles: string;
  img: string;
  url: string;
}

export interface Summary {
  values?: SummaryValue[];
  table: Table;
}

export interface SummaryValue {
  title: string;
  value: string;
  additionalInfo?: string;
  color?: string;
}

export interface Table {
  header: TableHeader;
  rows: TableRow[];
  name?: string;
  caption?: string;
}

export type TableHeader = string[];
export type TableRow = TableRowValue[];
export interface TableRowValue {
  value: string;
  caption?: string;
  tooltip?: string;
}

export interface ModelDescriptors {
  tables: Table[];
  caption?: string;
}

// DTO

export interface CompoundPropertiesDto {
  analogs: string[];
  logKowAnalogs: string[];
  chemicalProperties: ChemicalPropertiesDto;
  logKow: LogKowDto;
  meltingPoint: MeltingPointDto;
  boilingPoint: BoilingPointDto;
  hydrocarbonBiodegradationRate: BiohcwDto;
  [key: string]: unknown;
}

export interface ChemicalPropertiesDto {
  name: string;
  systematicName: Nullable<string>;
  cas: string;
  smiles: string;
  molecularWeight: number;
  molecularFormula: string;
  molecularFormulaHtml: string;
  organic: boolean;
  organicAcid: boolean;
  aminoAcid: boolean;
  nonStandardMetal: boolean;
  flags: unknown;
}

export interface LogKowDto {
  parameters: {
    smiles: string;
    cas: string;
  };
  estimatedValue: {
    model: {
      logKow: number;
      factors: Factor[];
      output: string;
      notes: string;
      flags: {
        isOrganicAcid: boolean;
        isAminoAcid: boolean;
      };
    };
    value: number;
    units: Nullable<Units>;
    valueType: 'ESTIMATED';
  };
  experimentalValues: ExperimentalValueDto[];
  selectedValue: SelectedValueDto;
}

export interface MeltingPointDto {
  estimatedValue: {
    model: {
      factors: Factor[];
      meltingPointKelvins: number;
      meltingPointLimitKelvins: number;
      meltingPointCelsius: number;
      meltingPointAdaptedJoback: number;
      meltingPointGoldOgle: number;
      meltingPointMean: number;
      meltingPointSelected: number;
    };
    value: number;
    units: Units;
    valueType: 'ESTIMATED';
  };
  experimentalValues: ExperimentalValueDto[];
  selectedValue: SelectedValueDto;
}

export interface BoilingPointDto {
  estimatedValue: {
    model: {
      factors: Factor[];
      boilingPointKelvinsUncorrected: number;
      boilingPointKelvinsCorrected: number;
      boilingPointCelsius: number;
    };
    value: number;
    units: Units;
    valueType: 'ESTIMATED';
  };
  experimentalValues: ExperimentalValueDto[];
  selectedValue: SelectedValueDto;
}

export interface BiohcwDto {
  parameters: {
    smiles: string;
    cas: string;
  };
  estimatedValue: {
    model: {
      halfLifeDays: Nullable<number>;
      logHalfLifeDays: Nullable<number>;
      factors: Factor[];
      notes: string;
      output: string;
    };
    value: Nullable<number>;
    units: Units;
    valueType: 'ESTIMATED';
  };
  experimentalValues?: ExperimentalValueDto[];
  selectedValue: SelectedValueDto;
}

interface SelectedValueDto {
  value: number;
  units: Units;
  valueType: ValueType;
}

interface ExperimentalValueDto {
  author?: string;
  year?: number;
  order?: number;
  value: number;
  units: Units;
  valueType: 'EXPERIMENTAL';
}

interface Factor {
  type: string;
  description: string;
  fragmentCount: number;
  coefficient: number;
  totalCoefficient?: number;
  contribution?: number;
  trainingCount?: number;
  validationCount?: number;
}

type ValueType = 'ESTIMATED' | 'EXPERIMENTAL';

type Units = 'celsius' | 'atm-m3/mol' | 'mmHg' | 'mg/L' | 'days';

export const UNITS: Record<Units, string> = {
  ['celsius']: 'C<sup>0</sup>',
  ['atm-m3/mol']: 'atm-m<sup>3</sup>/mol',
  ['mmHg']: 'mmHg',
  ['mg/L']: 'mg/L',
  ['days']: 'days',
};
