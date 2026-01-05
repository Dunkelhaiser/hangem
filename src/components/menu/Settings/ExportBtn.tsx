import { UploadIcon } from "lucide-react";
import { Button } from "@/ui/Button";

const ExportBtn = () => {
    return (
        <Button variant="outline">
            <UploadIcon className="size-4" />
            Export
        </Button>
    );
};
export { ExportBtn };
