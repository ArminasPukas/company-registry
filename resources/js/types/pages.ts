import { Company } from "./company";

export type IndexPageProps = {
    top_companies: Company[];
    company_count: number;
    companies_registered_this_year: number;
}
