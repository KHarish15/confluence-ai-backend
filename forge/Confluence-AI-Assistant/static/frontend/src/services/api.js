import { invoke } from "@forge/bridge";

// ---------------- Confluence APIs ----------------

export const getSpaces = () =>
    invoke("getSpaces");

export const getPages = (spaceId) =>
    invoke("getPages", { spaceId });

export const getPage = (pageId) =>
    invoke("getPage", { pageId });

export const chat = (data) =>
    invoke("chat", data);

export const updateDocument = (pageId, updatedContent) =>
    invoke("updateDocument", {
        pageId,
        updatedContent
    });

// ---------------- History APIs ----------------

export const createChat = (data) =>
    invoke("createChat", data);

export const appendMessage = (data) =>
    invoke("appendMessage", data);

export const getRecentChats = (feature) =>
    invoke("getRecentChats", { feature });

export const getChat = (chatId) =>
    invoke("getChat", { chatId });

export const deleteChat = (chatId) =>
    invoke("deleteChat", { chatId });