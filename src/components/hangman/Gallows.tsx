/** biome-ignore-all lint/style/noMagicNumbers: stages from 0 to 6 */
import { Card, CardContent } from "@/ui/Card";

interface Props {
    stage: number;
}

const Gallows = ({ stage }: Props) => {
    return (
        <Card>
            <CardContent>
                <svg
                    viewBox="0 0 200 250"
                    className="w-full h-auto max-w-[200px] stroke-slate-800 dark:stroke-stone-200 fill-none stroke-[6] stroke-linecap-round stroke-linejoin-round"
                >
                    {/* base */}
                    <path d="M20,230 Q100,225 180,230" />

                    {/* pole */}
                    <path d="M50,230 Q45,120 50,20" />

                    {/* beam */}
                    <path d="M50,20 Q110,25 150,20" />

                    {/* right support angle */}
                    <path d="M50,180 Q70,215 95,228" />
                    {/* left support angle */}
                    <path d="M50,180 Q35,215 20,230" />
                    {/* top support angle */}
                    <path d="M50,70 Q70,40 95,22" />

                    {/* rope */}
                    <path d="M150,20 Q145,45 150,60" />

                    {/* head */}
                    {stage >= 1 && <circle cx="150" cy="80" r="20" className="stroke-[5]" />}

                    {/* body */}
                    {stage >= 2 && <path d="M150,100 Q155,130 150,160" />}

                    {/* left arm */}
                    {stage >= 3 && <path d="M150,115 Q130,125 120,140" />}

                    {/* right arm */}
                    {stage >= 4 && <path d="M150,115 Q170,125 180,140" />}

                    {/* left leg */}
                    {stage >= 5 && <path d="M150,160 Q135,185 130,210" />}

                    {/* right leg */}
                    {stage >= 6 && <path d="M150,160 Q165,185 170,210" />}
                </svg>
            </CardContent>
        </Card>
    );
};

export { Gallows };
