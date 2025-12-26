import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const letterVariants = cva(
    `relative w-10 h-14 sm:w-12 sm:h-16 flex items-center justify-center
        font-mono text-2xl sm:text-3xl font-black uppercase transition-all
        border-2 border-border text-border mx-1 rounded-asymmetric
        shadow-ring
        `,
    {
        variants: {
            variant: {
                hidden: "bg-accent shadow-[1.5px_1.5px_0px] translate-active",
                guessed: "bg-white shadow-[3.5px_3.5px_0px]",
                reveal: "bg-white shadow-[3.5px_3.5px_0px]",
            },
            defaultVariants: {
                variant: "hidden",
            },
        },
    }
);

function Letter({
    variant = "hidden",
    letter,
    ...props
}: VariantProps<typeof letterVariants> & {
    letter: string;
}) {
    return (
        <div {...props} className={cn(letterVariants({ variant }))}>
            {variant !== "hidden" && (
                <span className={cn(variant === "reveal" && "!text-destructive/70 italic")}>{letter}</span>
            )}
            <div
                className={`
                    absolute bottom-3 w-1/2 h-1 rounded-full transition-colors duration-300
                    bg-accent-foreground
                `}
            />
        </div>
    );
}

export { Letter };
