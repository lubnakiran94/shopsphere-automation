export const logger = {

    info(message) {
        console.log(`[INFO] ${message}`);
    },

    success(message) {
        console.log(`[SUCCESS] ${message}`);
    },

    error(message) {
        console.error(`[ERROR] ${message}`);
    }

};