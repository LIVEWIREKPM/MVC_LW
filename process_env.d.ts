declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            PORT: number;
            MONGO_URI: string;
        }
    }
}