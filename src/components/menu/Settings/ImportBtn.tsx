import { DownloadIcon } from "lucide-react";
import { Button } from "@/ui/Button";

const ImportBtn = () => {
    return (
        <Button variant="outline">
            <DownloadIcon className="size-4" />
            Import
        </Button>
    );
};
export { ImportBtn };
