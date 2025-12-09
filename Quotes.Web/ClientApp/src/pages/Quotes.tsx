import React from "react";
import { Card } from "../../../ClientApp/my-lib/src";
import { Typography } from "../../../ClientApp/my-lib/src";
import { Button } from "../../../ClientApp/my-lib/src";

const mockQuotes = [
    { id: 1, author: "Albert Einstein", text: "Life is like riding a bicycle…" },
    { id: 2, author: "Oscar Wilde", text: "Be yourself; everyone else is already taken." },
    { id: 3, author: "Mark Twain", text: "The secret of getting ahead is getting started." },
];

export const Quotes: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                maxWidth: "700px",
                margin: "0 auto",
                padding: "32px"
            }}
        >
            <Typography as="h1" variant="h1">
                Quotes
            </Typography>

            {mockQuotes.map(q => (
                <Card key={q.id} variant="outlined" shadow="md">
                    <Typography as="h3" variant="textLarge">
                        {q.text}
                    </Typography>
                    <div style={{ opacity: 0.8 }}>
                        <Typography variant="textSmall">
                            — {q.author}
                        </Typography>
                    </div>
                    
                    <Button variant="secondary" size="small">
                        More by this author
                    </Button>
                </Card>
            ))}
        </div>
    );
};

export default Quotes;