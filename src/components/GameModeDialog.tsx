import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/Dialog";

interface GameModeDialogProps {
    trigger: ReactElement;
}

export const GameModeDialog = ({ trigger }: GameModeDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger render={trigger} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Choose Game Mode</DialogTitle>
                    <Button nativeButton={false} render={<Link to="/game" />}>
                        Classic Mode
                    </Button>
                    <Button variant="secondary">Challenge Mode</Button>
                    <Button variant="outline">Custom Word</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
