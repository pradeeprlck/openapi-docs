const { generateSpec } = require("har-to-openapi")
const har = require("./api-list.json");
const fs = require("fs");

const convertToOpenAPI = async () => {
    try {
console.log("har", har);
const openapi = await generateSpec(har, { relaxedMethods: true, relaxedContentTypeJsonParse: true, forceAllRequestsInSameSpec: true });
        const { spec, yamlSpec } = openapi;
        console.log("spec", spec);
        fs.writeFileSync("openapi.json", JSON.stringify(spec, null, 2));
        fs.writeFileSync("openapi.yaml", yamlSpec);
    } catch (error) {
        console.error("Error converting HAR to OpenAPI", error);
    }
}

convertToOpenAPI();