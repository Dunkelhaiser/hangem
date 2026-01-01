import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="system"
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-red-500 group-[.toaster]:text-popover-foreground group-[.toaster]:!border-border group-[.toaster]:!border-2 group-[.toaster]:!shadow-ring group-[.toaster]:!shadow-[4px_4px_0px] group-[.toaster]:!rounded-[15px_25px_20px_30px_/_25px_15px_30px_20px]",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    error: "group-[.toaster]:!text-destructive",
                    success: "group-[.toaster]:!text-success",
                    info: "group-[.toaster]:!text-primary dark:group-[.toaster]:!text-primary-foreground",
                    warning: "group-[.toaster]:!text-warning",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
