module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.ts",
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
        extensions: [".ts", ".js", ".tsx"]
    },
    output: {
        filename: "index.min.js",
        libraryTarget: "umd",
    },
}