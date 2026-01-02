import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/Button";

interface Props {
    children?: React.ReactNode;
}

export function BackNav({ children }: Props) {
    return (
        <div className="flex items-center mb-6 justify-between max-w-3xl mx-auto">
            <Button variant="link" size="sm" nativeButton={false} render={<Link to="/" />}>
                <ArrowLeft className="size-4" />
                Back
            </Button>
            {children}
        </div>
    );
}
