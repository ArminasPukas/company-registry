import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { search } from "@/routes/companies";
import { Company } from "@/types/company";
import { IndexPageProps } from "@/types/pages";
import { useHttp, usePage } from "@inertiajs/react";
import {
    Building2,
    MapPin,
    Search,
    TrendingUp,
    UserRound,
    X,
} from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
    setResponse: Dispatch<SetStateAction<Company[] | null>>;
};

const Header = ({ setResponse }: Props) => {
    const { props } = usePage<IndexPageProps>();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {
        company_count: companyCount,
        companies_registered_this_year: companiesRegisteredThisYear,
    } = props;

    const [city, setCity] = useState("");

    const { response, data, setData, get, post, setError, processing, errors } =
        useHttp<{ query: string }, Company[]>({
            query: "",
        });

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!data.query) {
            setError("query", "Paieškos laukelis negali būti tuščias");
            inputRef.current?.focus();
            return;
        }
        const res = await post(search.url());
        setResponse(res);
    };

    const metrics = [
        {
            label: "Registruotų įmonių",
            value: companyCount.toLocaleString("fr-FR"),
            note: `+${companiesRegisteredThisYear.toLocaleString("fr-FR")} šiemet`,
            icon: Building2,
        },
        {
            label: "Aktyvių darbuotojų",
            value: "",
            note: "+2,6% per metus",
            icon: UserRound,
        },
        {
            label: "Bendra apyvarta",
            value: "",
            note: "+6,8% per metus",
            icon: TrendingUp,
        },
    ];

    return (
        <section className="border-b border-border bg-card/30">
            <div className="mx-auto container px-4 py-8 lg:px-8 lg:py-11">
                <div className="mb-7 max-w-3xl animate-rise-in">
                    <Badge
                        variant="outline"
                        className="mb-3 border-primary/40 text-primary"
                    >
                        Lietuvos verslo duomenys
                    </Badge>
                    <h1 className="font-display text-3xl font-bold sm:text-4xl">
                        Raskite patikimą informaciją apie įmones
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Finansiniai rodikliai, darbuotojai, kontaktai ir
                        kreditingumo istorija vienoje vietoje.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex max-w-5xl flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input type="submit" hidden />
                            <Input
                                ref={inputRef}
                                value={data.query}
                                onChange={(e) =>
                                    setData({ query: e.target.value })
                                }
                                placeholder="Įmonės pavadinimas, kodas, vadovas ar veikla"
                                className="h-11 bg-card pl-10 pr-10"
                            />
                            {data.query && (
                                <Button
                                    onClick={() => setData({ query: "" })}
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1 size-9"
                                    aria-label="Išvalyti"
                                >
                                    <X />
                                </Button>
                            )}
                        </div>

                        <Select value={city} onValueChange={setCity}>
                            <SelectTrigger className="h-11 bg-card sm:w-52">
                                <MapPin className="mr-2 size-4 text-muted-foreground" />
                                <SelectValue placeholder="Visa Lietuva" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Visa Lietuva
                                </SelectItem>
                                <SelectItem value="Vilnius">Vilnius</SelectItem>
                                <SelectItem value="Kaunas">Kaunas</SelectItem>
                                <SelectItem value="Mažeikiai">
                                    Mažeikiai
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            size="lg"
                            className="h-11 px-7"
                            isLoading={processing}
                            disabled={processing}
                        >
                            <Search /> Ieškoti
                        </Button>
                    </div>
                    {errors.query ? (
                        <p className="text-sm text-destructive mt-1">
                            {errors.query}
                        </p>
                    ) : null}
                </form>
                <div className="mt-5 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                    {metrics.map(({ label, value, note, icon: Icon }) => (
                        <div
                            key={label}
                            className="flex items-center gap-4 bg-card px-5 py-4"
                        >
                            <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <Icon className="size-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    {label}
                                </p>
                                <p className="font-display text-xl font-semibold">
                                    {value}
                                </p>
                                <p className="text-xs text-primary">{note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Header;
