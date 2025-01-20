const { generateSpec } = require("har-to-openapi")
const har = require("./api-list.json");
const fs = require("fs");

// read a har file from wherever you want - in this example its just a root json object

// const har = {
//   log: {
//     entries: [
//       {
//         index: 0,
//         request: {
//           method: "CUSTOM",
//           url: "http://test.loadimpact.com/login",
//           headers: [
//             {
//               name: "Content-Type",
//               value: "application/x-www-form-urlencoded",
//             },
//           ],
//           postData: {
//             mimeType: "application/x-www-form-urlencoded",
//             text: "foo0=bar0&foo1=bar1",
//             params: [
//               {
//                 name: "foo0",
//                 value: "bar0",
//               },
//             ],
//           },
//         },
//       },
//     ],
//   },
// };

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