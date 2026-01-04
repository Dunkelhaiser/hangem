import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils";

function ScrollArea({ className, children, ...props }: ScrollAreaPrimitive.Root.Props) {
    return (
        <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("relative", className)} {...props}>
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

function ScrollBar({ className, orientation = "vertical", ...props }: ScrollAreaPrimitive.Scrollbar.Props) {
    return (
        <ScrollAreaPrimitive.Scrollbar
            data-slot="scroll-area-scrollbar"
            data-orientation={orientation}
            orientation={orientation}
            className={cn(
                "flex w-1 justify-center rounded bg-muted opacity-0 transition-opacity pointer-events-none data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0 data-[scrolling]:pointer-events-auto",
                className
            )}
            {...props}
        >
            <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" className="rounded-full bg-border w-full" />
        </ScrollAreaPrimitive.Scrollbar>
    );
}

export { ScrollArea, ScrollBar };
