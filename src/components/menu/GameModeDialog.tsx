import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/Dialog";
import { CustomWordDialog } from "./CustomWordDialog";

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
                <Button nativeButton={false} render={<Link to="/play" />}>
                    Classic Mode
                </Button>
                <Button variant="secondary">Challenge Mode</Button>
                <CustomWordDialog trigger={<Button variant="outline">Custom Word</Button>} />
            </DialogContent>
        </Dialog>
    );
};
