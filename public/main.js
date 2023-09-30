function renderTable(config = {}) {
    const table = document.createElement("table");
    table.setAttribute("border", "1")

    // Table Header
    const header_row = document.createElement("tr");
    const theads = [
        document.createElement("th"),
        document.createElement("th"),
        document.createElement("th")
    ]

    theads[0].innerText = "Key";
    theads[1].innerText = "Value";
    theads[2].innerText = "Type";

    theads.forEach(a => header_row.appendChild(a));
    table.appendChild(header_row);

    // Table Body
    Object.keys(config).forEach((key) => {
        const value = config[key];
        const type = typeof value;
        const body_row = document.createElement("tr");
        const tdatas = [
            document.createElement("td"),
            document.createElement("td"),
            document.createElement("td")
        ]

        tdatas[0].innerHTML = `<pre>${key}</pre>`;
        tdatas[1].innerHTML = `<pre>${value}</pre>`;
        tdatas[2].innerHTML = `<pre>${type}</pre>`;

        tdatas.forEach(a => body_row.appendChild(a));
        table.appendChild(body_row);
    });

    document.body.appendChild(table)
}

window.onload = () => {
    const config = new DynaLoad("http://localhost:3000/public/config.env");
    const output = document.getElementById("text-output");

    config.load({
        properties: {
            appName: { type: "string" },
            numericValue: { type: "number" },
            nullValue: { type: "null" }
        },
        required: ["appName", "numericValue"]
    }).then((loaded) => {
        output.innerText = JSON.stringify(loaded, null, 4);
        renderTable(loaded);
    }).catch((err) => {
        output.innerText = err.message | err.stack | "Something went wrong :("
    });
}