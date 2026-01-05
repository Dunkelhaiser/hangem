import { UploadIcon } from "lucide-react";
import { useExportHistory } from "@/lib/history/historyHooks";
import { Button } from "@/ui/Button";

const ExportBtn = () => {
    const { mutate: exportHistory, isPending } = useExportHistory();

    return (
        <Button variant="outline" onClick={() => exportHistory()} loading={isPending}>
            <UploadIcon className="size-4" />
            Export
        </Button>
    );
};
export { ExportBtn };
