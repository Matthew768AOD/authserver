import React from "react";
import { Card } from "../../../ClientApp/my-lib/src";
import { Typography } from "../../../ClientApp/my-lib/src";
import { Button } from "../../../ClientApp/my-lib/src";

const mockAuthors = [
    { id: 1, name: "Albert Einstein", quotes: 14 },
    { id: 2, name: "Oscar Wilde", quotes: 21 },
    { id: 3, name: "Mark Twain", quotes: 9 }
];

export const Authors: React.FC = () => {
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
                Authors
            </Typography>

            {mockAuthors.map(author => (
                <Card key={author.id} variant="outlined" shadow="md">
                    <Typography as="h2" variant="h2">
                        {author.name}
                    </Typography>

                    <Typography variant="textLarge">
                        Quotes: {author.quotes}
                    </Typography>

                    <Button size="medium" variant="primary">
                        View quotes
                    </Button>
                </Card>
            ))}
        </div>
    );
};

export default Authors;