import {Skeleton} from "primereact/skeleton";

export const GameCardSkeleton = ({length = 8}) => {
    return (
        <>
            <div className='grid'>
                {Array.from({length}).map((_, i) => (
                    <div className='col-12 sm:col-6 md:col-4 lg:col-3' key={i}>
                        <div className="card">
                            <div className="border-round border-1 surface-border p-4 surface-card">
                                <Skeleton className='mb-3' width="100%" height="180px"></Skeleton>
                                <Skeleton width="100%"></Skeleton>
                                <div className="flex justify-content-center gap-3 mt-3">
                                    <Skeleton shape="circle" size="3rem"></Skeleton>
                                    <Skeleton shape="circle" size="3rem"></Skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}