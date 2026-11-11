
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const PAY_TO = "0xce3e2e571d25cca5527722699ffab1b71cc83a15";

async function startServer() {
    const { paymentMiddleware, x402ResourceServer } =
        await import("@x402/express");

    const { HTTPFacilitatorClient } =
        await import("@x402/core/server");

    const { ExactEvmScheme } =
        await import("@x402/evm/exact/server");

    const facilitator = new HTTPFacilitatorClient({
        url: "https://facilitator.xpay.sh"
    });

    const resourceServer = new x402ResourceServer(facilitator);

    resourceServer.register(
        "eip155:8453",
        new ExactEvmScheme()
    );

    app.use(
        paymentMiddleware(
            {
                "GET /": {
                    accepts: [
                        {
                            scheme: "exact",
                            price: "$0.001",
                            network: "eip155:8453",
                            payTo: PAY_TO
                        }
                    ],
                    description: "Access to My First API",
                    mimeType: "application/json"
                }
            },
            resourceServer
        )
    );

    app.get("/", (req, res) => {
        res.json({
            message: "Hello! My first API is working!",
            status: "success",
            creator: "My First API"
        });
    });

    app.listen(PORT, () => {
        console.log(`API is running on port ${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("Failed to start API:", error);
    process.exit(1);
});
