module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        "dynaload": ["./src/dynaload.ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        libraryExport: "default",
        library: "DynaLoad",
        filename: "dynaload.js",
        libraryTarget: "umd",
        globalObject: "this"
    },
}