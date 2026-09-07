import Resolver from "@forge/resolver";
import fetch from "node-fetch";

const resolver = new Resolver();

const BACKEND_URL = "http://host.docker.internal:8000";

// ======================
// Get Pages
// ======================

resolver.define("getPages", async ({ payload }) => {

    const { spaceId } = payload;

    const response = await fetch(
        `${BACKEND_URL}/confluence/spaces/${spaceId}/pages`
    );

    if (!response.ok) {
        throw new Error("Unable to fetch pages");
    }

    return await response.json();
});

export const handler = resolver.getDefinitions();