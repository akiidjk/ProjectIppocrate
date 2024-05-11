import { Page, Paragraph } from "@/context/page_provider";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonImgL1() {
    return (
        <div>
            <Skeleton className="w-[400px] h-[200px] ml-3 mr-4 rounded-2xl"/>
        </div>
    );
}

function SkeletonContentL1() {
    return (
        <div>
            <Skeleton className="w-[100px] h-[50px] mb-4"/>
            <Skeleton className="w-[200px] h-[130px] float-right"/>
        </div>
    );
}

function SkeletonImgL2() {
    return (
        <div>
            <Skeleton className="w-[150px] h-[150px] rounded-full"/>
        </div>
    );
}

function SkeletonContentL2() {
    return (
        <div>
            <Skeleton className="w-[450px] h-[150px] float-right mr-6"/>
        </div>
    );
}

export default function PreviewPage({ localPage }: { localPage: Page }) {
    return (
        <div>
            {
                localPage.page.title ?
                <div className="flex">
                    <Skeleton className="ms-auto me-auto w-[200px] h-[30px] mb-4"/>
                </div> :
                    <div></div>

            }
            {localPage.page.paragraphs.map((paragraph: Paragraph, index: number) => {
                switch (paragraph.layout_type) {
                    case 1:
                    case 4:
                        return (
                            <div className="mt-20 flex" key={index}>
                                {paragraph.layout_type === 1 ? (
                                    <>
                                        <SkeletonImgL1 />
                                        <SkeletonContentL1 />
                                    </>
                                ) : (
                                    <>
                                        <SkeletonContentL1 />
                                        <SkeletonImgL1 />
                                    </>
                                )}
                            </div>
                        );
                    case 2:
                    case 5:
                        return (
                            <div className="mt-20 flex"  key={index}>
                                {paragraph.layout_type === 2 ? (
                                    <>
                                        <SkeletonContentL2 />
                                        <SkeletonImgL2 />
                                    </>
                                ) : (
                                    <>
                                        <SkeletonImgL2 />
                                        <SkeletonContentL2 />
                                    </>
                                )}
                            </div>
                        );
                    case 3:
                        return (
                            <div className="m-20" key={index}>
                                <div className="flex">
                                    <Skeleton className="w-[150px] h-[50px] me-auto ms-auto mb-4" />
                                </div>
                                <div className="flex">
                                    <Skeleton className="w-[450px] h-[150px] mb-4 me-auto ms-auto" />
                                </div>
                            </div>
                        );
                    default:
                        return <div key={index}></div>;
                }
            })}
        </div>
    );
}
