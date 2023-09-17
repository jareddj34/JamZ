"use client";

import Image from "next/image";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import "dotenv/config";

const inter = Inter({ subsets: ["latin"] });

export default function TextSimple() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState(null);
    const handleChange = async (file) => {
        setFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const openai = new OpenAIApi(
            new Configuration({
                apiKey: process.env.NEXT_PUBLIC_API_KEY,
            })
        );

        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Read this document and summarize in multiple sections
                    what it is about: ${text}`,
                },
            ],
        });
        const content = res.data.choices[0].message?.content;

        setResponse(content);
        setLoading(false);
        event.preventDefault();
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex flex-row">
                    <div style={{ marginRight: "50px" }}>
                        <Card>
                            <CardContent>
                                <p style={{ marginTop: "20px" }}>
                                    JamZ works for all your legal documents:
                                </p>
                                <ul>
                                    <li>Contracts</li>
                                    <li>Terms</li>
                                    <li>Affidavits</li>
                                    <li>Leases</li>
                                    <li>Wills</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <FileUploader />
                        <p style={{ margin: "20px" }}>Or</p>
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your document text here"
                            style={{
                                width: "600px",
                                height: "200px",
                                marginBottom: "20px",
                            }}
                        />
                        <Button
                            type="submit"
                            value="Submit"
                            className="submit-btn mb-10"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading
                                ? // Show loader when loading is true
                                  "Loading..."
                                : "Submit"}
                        </Button>
                    </div>
                </div>

                <h1 className="text-3xl">Your simplified document:</h1>
                <hr
                    style={{
                        width: "50%",
                        borderTop: "1px solid #ccc",
                        margin: "20px 0",
                    }}
                />
                <pre
                    style={{
                        fontSize: "16px",
                        backgroundColor: "rgba(112, 128, 144, 0)",
                        padding: "10px",
                        whiteSpace: "pre-wrap",
                    }}
                    className={cn(
                        "bg-white text-slate-900 antialiased light",
                        inter.className
                    )}
                >
                    {response}
                </pre>
            </div>
        </>
    );
}
