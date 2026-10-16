import { Head, useHttp, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Company } from "@/types/company";
import { DataTable } from "@/components/ui/DataTable";
import { companiesTable } from "@/tables/formats/CompaniesTableFormat";
import { search } from "@/routes/companies";
import Header from "./Components/Header";
import TopCompanies from "./Components/TopCompanies";
import { IndexPageProps } from "@/types/pages";
import { useState } from "react";

export default function Welcome() {
    const { props } = usePage<IndexPageProps>();
    const [response, setResponse] = useState<Company[] | null>(null);

    return (
        <>
            <Head title="Welcome" />
            <Header setResponse={setResponse} />
            <TopCompanies response={response} />
            {/* <div className="container mx-auto py-8">
                {search.url()}
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="query" className="mb-1">
                        Įmonės pavadinimas
                    </Label>
                    <Input
                        id="query"
                        type="text"
                        name="query"
                        value={data.query}
                        onChange={(e) => setData("query", e.target.value)}
                    />

                    {errors.query && (
                        <div className="text-red-500 mt-1">{errors.query}</div>
                    )}

                    <Button
                        type="submit"
                        variant="outline"
                        disabled={processing}
                        className="mt-2"
                    >
                        {processing ? "Searching..." : "Search"}
                    </Button>
                </form>
            </div> */}
        </>
    );
}
