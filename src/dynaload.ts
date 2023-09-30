import Ajv from "ajv";
import { inferDataType, snakeCaseToCamelCase } from "./utils";

type Config = {
    [key: string]: string | number | boolean | null;
};

class DynaLoad {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    /**
     * Load the config from the remote server
     * @param schema JSON schema of config
     * @returns
     */
    public async load(schema: any): Promise<any> {
        // Make request to the server
        const req = await fetch(this.url);
        const text = await req.text();
        const json = this.parseTextConfigToJSON(text);

        // Validation
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        if (validate(json)) {
            return json;
        }

        throw new Error(`invalid config response: ${JSON.stringify(validate.errors)}`);
    }

    private parseTextConfigToJSON(text: string): Config {
        let config = {};

        text.split(/\r?\n/).forEach((line, index) => {
            const parts = line.split("=");

            if (parts.length > 2) {
                throw new Error(
                    `too many arguments in one line - line no.: ${index + 1}, value: ${line}`
                );
            }

            if (parts.length === 0 || parts[0] === undefined || parts[1] === undefined) {
                throw new Error(
                    `invalid text config format - line no.: ${index + 1}, value: ${line}`
                );
            }

            const key: string = snakeCaseToCamelCase(parts[0]);
            let value: string | boolean | number | null = inferDataType(parts[1]);

            console.log(key, value, typeof value);

            config = { ...config, [key]: value };
        });

        return config;
    }
}

export default DynaLoad;
