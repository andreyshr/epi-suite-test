import type { ChemicalProperties, ChemicalPropertiesDto } from '../types';

export function chemicalPropertiesMapper(obj: ChemicalPropertiesDto): ChemicalProperties {
  return {
    name: obj.name,
    systematicName: obj.systematicName ?? 'N/A',
    cas: obj.cas,
    molecularWeight: obj.molecularWeight.toFixed(3),
    molecularFormulaHtml: obj.molecularFormulaHtml,
    smiles: obj.smiles,
    img: `https://episuite.dev/EpiWebSuite/api/draw-chemical?smiles=${obj.smiles}`,
    url: `/?cas=${obj.cas}`,
  };
}
