export type ServiceCellId = "chicago" | "nw-suburbs";

export type ServiceCell = {
  id: ServiceCellId;
  label: string;
  zips: readonly string[];
};

/**
 * Hand-maintained coverage. Add a ZIP here when a facilitator cell picks it up.
 * Both programs share this list — coverage is by cell, not by program.
 *
 * Source of the locked lists: jawly-website-service-area-definition.md
 * Cell 1 is Chicago's north, northwest, and central side, west to California Ave.
 * Cell 2 is the Crystal Lake–Barrington northwest suburbs corridor.
 * An empty array means the cell is defined but no ZIP is covered yet.
 */
export const serviceCells: readonly ServiceCell[] = [
  {
    id: "chicago",
    label: "Chicago",
    zips: [
      "60601",
      "60602",
      "60603",
      "60604",
      "60606",
      "60607",
      "60610",
      "60611",
      "60613",
      "60614",
      "60618",
      "60622",
      "60625",
      "60626",
      "60630",
      "60631",
      "60634",
      "60641",
      "60642",
      "60645",
      "60646",
      "60647",
      "60654",
      "60656",
      "60657",
      "60659",
      "60660",
      "60661",
    ],
  },
  {
    id: "nw-suburbs",
    label: "Northwest suburbs",
    zips: [],
  },
];

const zipToCell = new Map<string, ServiceCellId>(
  serviceCells.flatMap((cell) => cell.zips.map((zip) => [zip, cell.id] as const)),
);

export type ZipLookup =
  | { status: "invalid" }
  | { status: "not-covered" }
  | { status: "covered"; cellId: ServiceCellId };

export function lookupZip(zip: string): ZipLookup {
  if (!/^\d{5}$/.test(zip)) return { status: "invalid" };
  const cellId = zipToCell.get(zip);
  if (!cellId) return { status: "not-covered" };
  return { status: "covered", cellId };
}
