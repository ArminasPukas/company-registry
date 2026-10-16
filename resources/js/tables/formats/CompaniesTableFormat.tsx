import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "../DataTableFeatures"
import { Company } from "@/types/company"

const columnHelper = createColumnHelper<DataTableFeatures, Company>()

export const companiesTable = columnHelper.columns([
  columnHelper.accessor("company_name", {
    header: "Įmonė",
  }),
  columnHelper.accessor("company_name_slug", {
    header: "Slug",
  }),
  columnHelper.accessor("company_code", {
    header: "JAR Kodas",
  }),
  columnHelper.accessor("address", {
    header: "Adresas",
  }),
])