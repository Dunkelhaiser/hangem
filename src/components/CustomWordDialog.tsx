import { useForm } from "@tanstack/react-form";
import { Share2 } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { customWordSchema } from "@/lib/game/customWordSchema";
import { encodeCustomWord } from "@/lib/game/encoding";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/Dialog";
import { Input } from "@/ui/Input";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/Field";

interface Props {
    trigger: React.ReactElement;
}

export const CustomWordDialog = ({ trigger }: Props) => {
    const id = useId();
    const [open, setOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            word: "",
            category: "",
        },
        validators: {
            onSubmit: customWordSchema,
        },
        onSubmit: async ({ value }) => {
            const parsedValue = customWordSchema.parse(value);
            const encodedData = encodeCustomWord({
                word: parsedValue.word,
                category: parsedValue.category || undefined,
            });

            const url = new URL("/game", window.location.origin);
            url.searchParams.set("word", encodedData);

            const isMobile = window.matchMedia("(pointer: coarse)").matches;
            if (isMobile && navigator.share) {
                await navigator.share({ url: url.toString() });
            } else {
                await navigator.clipboard.writeText(url.toString());
                toast.success("Link copied to clipboard");
            }

            setOpen(false);
            form.reset();
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={trigger} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Custom Word</DialogTitle>
                </DialogHeader>
                <form
                    id={id}
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="word"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Word</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="Enter a word to guess"
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="category"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="e.g. Animal, Food, Movie..."
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Button form={id} variant="secondary" type="submit">
                        <Share2 className="size-4" />
                        Share
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
