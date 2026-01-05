import { DownloadIcon, LoaderIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useImportHistory } from "@/lib/history/historyHooks";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/ui/Dialog";

const ImportBtn = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { mutate: importHistory, isPending } = useImportHistory();

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setDialogOpen(true);
            e.target.value = "";
        }
    };

    const handleConfirm = () => {
        if (selectedFile) {
            importHistory(selectedFile);
            setDialogOpen(false);
            setSelectedFile(null);
        }
    };

    const handleCancel = () => {
        setDialogOpen(false);
        setSelectedFile(null);
    };

    return (
        <>
            <input ref={inputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
            <Button variant="outline" onClick={handleClick} disabled={isPending}>
                {isPending ? <LoaderIcon className="size-4 animate-spin" /> : <DownloadIcon className="size-4" />}
                Import
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Import History</DialogTitle>
                        <DialogDescription>
                            This will replace all your existing game history with the imported data. This action cannot
                            be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirm}>
                            Replace History
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
export { ImportBtn };
