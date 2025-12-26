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
                    <style>
                        {`
                            @keyframes drawPath {
                                from {
                                    stroke-dashoffset: var(--path-length);
                                }
                                to {
                                    stroke-dashoffset: 0;
                                }
                            }
                            @keyframes drawHead {
                                from {
                                    stroke-dashoffset: 126;
                                }
                                to {
                                    stroke-dashoffset: 0;
                                }
                            }
                            @keyframes swing {
                                0%, 100% {
                                    transform: rotate(-2deg);
                                }
                                50% {
                                    transform: rotate(2deg);
                                }
                            }
                            .animate-draw-head {
                                stroke-dasharray: 126;
                                stroke-dashoffset: 126;
                                animation: drawHead 0.4s ease-out forwards;
                            }
                            .animate-draw-body {
                                --path-length: 65;
                                stroke-dasharray: 65;
                                stroke-dashoffset: 65;
                                animation: drawPath 0.3s ease-out forwards;
                            }
                            .animate-draw-arm {
                                --path-length: 45;
                                stroke-dasharray: 45;
                                stroke-dashoffset: 45;
                                animation: drawPath 0.25s ease-out forwards;
                            }
                            .animate-draw-leg {
                                --path-length: 60;
                                stroke-dasharray: 60;
                                stroke-dashoffset: 60;
                                animation: drawPath 0.3s ease-out forwards;
                            }
                            .animate-swing {
                                transform-origin: 150px 60px;
                                animation: swing 2s ease-in-out infinite;
                            }
                        `}
                    </style>

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

                    {/* hangman body group with swing animation */}
                    <g className={stage >= 1 ? "animate-swing" : ""}>
                        {/* head - drawn as path starting from rope point (top) */}
                        {stage >= 1 && (
                            <path d="M150,60 A20,20 0 1,1 149.99,60" className="stroke-[5] animate-draw-head" />
                        )}

                        {/* body */}
                        {stage >= 2 && <path d="M150,100 Q155,130 150,160" className="animate-draw-body" />}

                        {/* left arm */}
                        {stage >= 3 && <path d="M150,115 Q130,125 120,140" className="animate-draw-arm" />}

                        {/* right arm */}
                        {stage >= 4 && <path d="M150,115 Q170,125 180,140" className="animate-draw-arm" />}

                        {/* left leg */}
                        {stage >= 5 && <path d="M150,160 Q135,185 130,210" className="animate-draw-leg" />}

                        {/* right leg */}
                        {stage >= 6 && <path d="M150,160 Q165,185 170,210" className="animate-draw-leg" />}
                    </g>
                </svg>
            </CardContent>
        </Card>
    );
};

export { Gallows };
