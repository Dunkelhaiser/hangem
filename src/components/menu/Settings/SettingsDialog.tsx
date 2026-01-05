import type { ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/Dialog";
import { Label } from "@/ui/Label";
import { Separator } from "@/ui/Separator";
import { ClearDataBtn } from "./ClearDataBtn";
import { ExportBtn } from "./ExportBtn";
import { ImportBtn } from "./ImportBtn";
import { ThemeSelect } from "./ThemeSelect";

interface Props {
    trigger: ReactElement;
}

const SettingsDialog = ({ trigger }: Props) => {
    return (
        <Dialog>
            <DialogTrigger render={trigger} />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Theme</Label>
                        <ThemeSelect />
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2 ">
                        <Label>Data</Label>
                        <div className="flex gap-2 flex-wrap">
                            <ExportBtn />
                            <ImportBtn />
                            <ClearDataBtn />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { SettingsDialog };
