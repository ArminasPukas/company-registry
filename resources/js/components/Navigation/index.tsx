import { Bell, Building2, CircleHelp, Menu, UserRound } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Navigation = (props: Props) => {
    return (
        <nav>
            <div className="sticky top-0 border-b border-border bg-background/95 backdrop-blur">
                <div className="container mx-auto flex h-16 items-center gap-5 px-4 lg:px-8 justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Building2 className="size-5" />
                        </div>
                        <span className="font-display text-xl font-bold">
                            rekvizitai
                            <span className="text-primary">.lt</span>
                        </span>
                    </div>
                    <div className="hidden items-center gap-1 lg:flex">
                        {[
                            "Įmonės",
                            // "Darbo skelbimai",
                            // "Atlyginimai",
                            // "Verslo žemėlapis",
                        ].map((item, i) => (
                            <Button
                                key={item}
                                variant={i === 0 ? "secondary" : "ghost"}
                                size="sm"
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Pagalba"
                        >
                            <CircleHelp />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Pranešimai"
                        >
                            <Bell />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:inline-flex"
                        >
                            <UserRound /> Prisijungti
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            aria-label="Meniu"
                        >
                            <Menu />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
