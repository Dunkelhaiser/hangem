import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useClearHistory } from "@/lib/history/historyHooks";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/ui/Dialog";

const ClearDataBtn = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { mutate: clearHistory, isPending } = useClearHistory();

    const handleConfirm = () => {
        clearHistory(undefined, {
            onSuccess: () => setDialogOpen(false),
        });
    };

    return (
        <>
            <Button variant="outline" onClick={() => setDialogOpen(true)} loading={isPending}>
                <Trash2Icon className="size-4" />
                Clear Data
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Clear History</DialogTitle>
                        <DialogDescription>
                            This will permanently delete all your game history. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirm} loading={isPending}>
                            Clear History
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
export { ClearDataBtn };
