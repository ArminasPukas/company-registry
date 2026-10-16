import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { companiesTable } from "@/tables/formats/CompaniesTableFormat";
import { Company } from "@/types/company";
import { IndexPageProps } from "@/types/pages";
import { usePage } from "@inertiajs/react";
import { Download } from "lucide-react";

type Props = {
    response: Company[] | null;
};

const TopCompanies = ({ response }: Props) => {
    const { props } = usePage<IndexPageProps>();
    const { top_companies: topCompanies, company_count: companyCount } = props;
    return (
        <section className="container mx-auto px-4 py-7 lg:px-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold">
                        Didžiausios Lietuvos įmonės
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Rasta {companyCount.toLocaleString("fr-FR")} įmonių ·
                        duomenys atnaujinti šiandien
                    </p>
                </div>
                <div>
                    <Button variant={"outline"} size={"sm"}>
                        <Download />
                        Eksportuoti
                    </Button>
                </div>
            </div>
            <DataTable
                columns={companiesTable}
                data={response || topCompanies}
            />
        </section>
    );
};

export default TopCompanies;
