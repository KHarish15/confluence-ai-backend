import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

// ---------------- Confluence APIs ----------------

// Get all spaces
export const getSpaces = () =>
    API.get("/confluence/spaces");

// Get all pages in a space
export const getPages = (spaceId) =>
    API.get(`/confluence/spaces/${spaceId}/pages`);

// Get a single page
export const getPage = (pageId) =>
    API.get(`/confluence/pages/${pageId}`);

// Chat with selected page
export const chat = (data) =>
    API.post("/chat/", data);

// Update selected page
export const updateDocument = (pageId, updatedContent) =>
    API.put(`/confluence/pages/${pageId}`, {
        updated_content: updatedContent
    });

// ---------------- History APIs ----------------

export const createChat = (data) =>
    API.post("/history/create", data);

export const appendMessage = (data) =>
    API.post("/history/message", data);

export const getRecentChats = (feature) =>
    API.get(`/history/${feature}`);

export const getChat = (chatId) =>
    API.get(`/history/chat/${chatId}`);

export const deleteChat = (chatId) =>
    API.delete(`/history/${chatId}`);