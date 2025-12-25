import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "relative inline-flex items-center justify-center whitespace-nowrap font-mono font-black uppercase tracking-widest transition-all outline-none select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:duration-75 border-2 rounded-sketchy",
    {
        variants: {
            variant: {
                default: `
                    bg-primary text-primary-foreground border-border shadow-ring shadow-deep
                    hover:translate-hover hover:shadow-medium
                    focus-visible:translate-hover focus-visible:shadow-medium
                    active:translate-active active:shadow-base
                `,
                secondary: `
                    bg-secondary text-secondary-foreground border-ring shadow-ring shadow-deep
                    hover:translate-hover hover:shadow-medium
                    focus-visible:translate-hover focus-visible:shadow-medium
                    active:translate-active active:shadow-base
                `,
                outline: `
                    border-border text-border shadow-ring shadow-deep
                    hover:translate-hover hover:shadow-medium hover:bg-secondary/5
                    focus-visible:translate-hover focus-visible:shadow-medium focus-visible:bg-secondary/5
                    active:bg-secondary/5 active:translate-active active:shadow-base
                    dark:text-secondary-foreground
                `,
                ghost: `
                    text-secondary/80 border-transparent border-dashed
                    hover:bg-secondary/5 hover:border-secondary/80
                    active:bg-secondary/5 active:border-secondary/80
                    focus-visible:bg-secondary/5 focus-visible:border-secondary/80
                    dark:text-secondary-foreground/80 dark:hover:bg-secondary/30 dark:active:bg-secondary/30 dark:focus-visible:bg-secondary/30
                `,
                destructive: `
                    bg-destructive/5 text-destructive border-destructive shadow-destructive shadow-deep
                    hover:translate-hover hover:shadow-medium hover:bg-destructive/10
                    focus-visible:translate-hover focus-visible:shadow-medium focus-visible:bg-destructive/10
                    active:bg-destructive/10 active:translate-active active:shadow-base
                    dark:bg-destructive/15 dark:hover:bg-destructive/20 dark:active:bg-destructive/20
                `,
                link: `
                    border-none p-0 text-primary-foreground underline-offset-4
                    hover:underline
                    active:underline
                    focus-visible:underline
                    dark:text-secondary-foreground
                `,
            },
            size: {
                default: "h-10 px-6 py-2.5 text-sm",
                xs: "h-7 px-3 py-1 text-[10px]",
                sm: "h-8 px-4 py-2 text-xs",
                lg: "h-12 px-10 py-4 text-lg",
                icon: "h-10 w-10",
                "icon-xs": "h-7 w-7",
                "icon-sm": "h-8 w-8",
                "icon-lg": "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant = "default",
    size = "default",
    ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
}

export { Button, buttonVariants };
