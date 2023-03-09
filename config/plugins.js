module.exports = ({ env }) => ({
    email: {
        provider: "sendgrid",
        providerOptions: {
            apiKey:
                env("SENDGRID_API_KEY"),
        },
        settings: {
            defaultFrom: "atour.eisayans@gmail.com",
            defaultReplyTo: "atour.eisayans@gmail.com",
            testAddress: 'easayansatur@gmail.com',
        },
    },
});
