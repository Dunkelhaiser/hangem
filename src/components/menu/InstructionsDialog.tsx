import type { ReactElement, ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/Dialog";
import { ScrollArea } from "@/ui/ScrollArea";
import { Separator } from "@/ui/Separator";

interface Props {
    trigger: ReactElement;
}

const SectionTitle = ({ children }: { children: ReactNode }) => (
    <h3 className="font-bold text-foreground mb-1">{children}</h3>
);

const SectionList = ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside space-y-1">{children}</ul>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <section>
        <SectionTitle>{title}</SectionTitle>
        {children}
    </section>
);

export const InstructionsDialog = ({ trigger }: Props) => {
    return (
        <Dialog>
            <DialogTrigger render={trigger} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>How to Play</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[75vh]">
                    <DialogDescription className="flex flex-col gap-4 pr-2">
                        <Section title="Objective">
                            <p>Guess the hidden word one letter at a time before the hangman is fully drawn.</p>
                        </Section>
                        <Separator />
                        <Section title="Rules">
                            <SectionList>
                                <li>You have 6 attempts to guess the word</li>
                                <li>Each wrong guess adds a body part to the gallows</li>
                                <li>Correctly guessed letters are revealed in the word</li>
                                <li>The game ends when you guess the word or run out of attempts</li>
                            </SectionList>
                        </Section>
                        <Separator />
                        <Section title="Game Modes">
                            <SectionList>
                                <li>
                                    <strong>Classic Mode:</strong> Guess a randomly generated word
                                </li>
                                <li>
                                    <strong>Custom Word:</strong> Create a shareable link with your own word for others
                                    to guess
                                </li>
                            </SectionList>
                        </Section>
                        <Separator />
                        <Section title="Controls">
                            <SectionList>
                                <li>Click letters on the on-screen keyboard to make guesses</li>
                                <li>Use your physical keyboard to type letters directly</li>
                            </SectionList>
                        </Section>
                    </DialogDescription>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
