import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-primary text-primary-foreground">
            {children}
        </div>
    )
}
