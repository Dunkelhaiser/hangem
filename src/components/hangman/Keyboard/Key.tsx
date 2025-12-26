import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/Button";

const keyVariants = cva("rounded-square disabled:opacity-100 font-mono font-bold text-xl", {
    variants: {
        variant: {
            idle: "",
            correct: `
                    bg-success/20 text-success border-success shadow-success line-through
                    dark:bg-success/15
                    translate-active shadow-[1.5px_1.5px_0px]
                `,
            wrong: `
                    bg-muted-foreground/5 text-muted-foreground/50 border-muted-foreground/50 shadow-muted-foreground/50
                    dark:bg-muted-foreground/15 
                    translate-active shadow-[1.5px_1.5px_0px]
                `,
        },
        defaultVariants: {
            variant: "idle",
        },
    },
});

function Key({
    variant = "idle",
    letter,
    ...props
}: VariantProps<typeof keyVariants> & {
    letter: string;
}) {
    return (
        <Button
            variant="default"
            size="icon-lg"
            disabled={variant !== "idle"}
            className={cn(keyVariants({ variant }))}
            {...props}
        >
            {variant === "wrong" && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {/** biome-ignore lint/a11y/noSvgWithoutTitle: decoration */}
                    <svg className="w-full h-full text-muted-foreground/15" viewBox="0 0 100 100">
                        <line
                            x1="10"
                            y1="10"
                            x2="90"
                            y2="90"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                        <line
                            x1="90"
                            y1="10"
                            x2="10"
                            y2="90"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            )}
            {letter}
        </Button>
    );
}

export { Key };
