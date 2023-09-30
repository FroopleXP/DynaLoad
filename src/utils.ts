export function snakeCaseToCamelCase(input: string): string {
    // Check there's no special chars
    const valid: boolean = /^[a-zA-Z0-9_]+$/.test(input);
    if (!valid) {
        throw new TypeError(`input must only include alpha-numeric characters and '_'`);
    }

    // Lowercase
    let camel: string = "";

    // Replace 'my_name' with 'myName'
    for (let i = 0; i < input.length; i++) {
        const current: string = input.charAt(i);
        if (current === "_") {
            camel += input.charAt(++i).toUpperCase();
            continue;
        }
        camel += current.toLowerCase();
    }

    return camel;
}

export function inferDataType(value: string): string | boolean | number | null {
    if (value === "null") return null;

    let valueN: number = parseInt(value);
    if (!Number.isNaN(valueN)) {
        return valueN;
    }

    if ((value as string).toLowerCase() === "true") return true;
    if ((value as string).toLowerCase() == "false") return false;

    return value;
}
