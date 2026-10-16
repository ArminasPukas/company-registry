import Navigation from "@/components/Navigation"

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navigation />
            {children}
        </div>
    );
}
