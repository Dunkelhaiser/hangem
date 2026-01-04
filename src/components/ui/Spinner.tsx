import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

const spinnerVariants = cva("border-orange-200 animate-spin rounded-full border-4 border-t-transparent", {
    variants: {
        size: {
            lg: "h-10 w-10",
            default: "h-6 w-6",
            sm: "h-4 w-4",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

const Spinner = ({ className, size }: Props & VariantProps<typeof spinnerVariants>) => {
    return (
        // biome-ignore lint/a11y/useSemanticElements: spinner
        <div role="status" aria-label="Loading" className={cn(spinnerVariants({ size }), className)} />
    );
};
export default Spinner;
