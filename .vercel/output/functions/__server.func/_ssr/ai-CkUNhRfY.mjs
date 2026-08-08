import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./server-So0GBSqD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-CkUNhRfY.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getAiFeedback = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("221f9ae60ee323c1faecbeafc587abdeedee4b9bf18c3d3dd9f56e83ebe08763"));
var getAiPitch = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d9500dcd8a12e465b5fcfe1a83e410407a63171b81adcd27c1a50504ed103079"));
//#endregion
export { getAiPitch as n, getAiFeedback as t };
