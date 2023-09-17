"use client";

import TextSimple from "@/components/TextSimple";

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-7xl pb-4 font-bold">JamZ</h1>
                <p className="pb-8 text-3xl mb-10">File reading made easier.</p>
            </div>

            <TextSimple />
        </>
    );
}
