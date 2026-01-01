import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { CustomWordDialog } from "@/components/CustomWordDialog";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/Dialog";

interface Props {
    trigger: ReactElement;
}

export const GameModeDialog = ({ trigger }: Props) => {
    return (
        <Dialog>
            <DialogTrigger render={trigger} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Choose Game Mode</DialogTitle>
                </DialogHeader>
                <Button nativeButton={false} render={<Link to="/game" />}>
                    Classic Mode
                </Button>
                <Button variant="secondary">Challenge Mode</Button>
                <CustomWordDialog trigger={<Button variant="outline">Custom Word</Button>} />
            </DialogContent>
        </Dialog>
    );
};
