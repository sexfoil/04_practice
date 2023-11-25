import axios from 'axios';


const BASE_URL = 'https://the-one-api.dev/v2';
const BEARER_TOKEN = 'CF9pReNG_Lb_8KBokb0w';
// const BEARER_TOKEN = 'XJlq9OFMcHAy8pAQK7xj';

const endpoints = {
    character: 'character',
}

const config = {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
}

function getSearchUrl(endpoint, params) {
    return `${BASE_URL}/${endpoint}?${params}`;
}

function getParams(page, sort) {
    const template = {
        page,
        sort,
        limit: 20,
    }
    return new URLSearchParams(template);    
}

async function fetchUrl(endpoint, params) {
    const url = getSearchUrl(endpoint, params);
    console.log(url);
    const data = await axios.get(url, config);
    return data;
}


export function getCharacters(page = 1, sorting = '') {    
    const params = getParams(page, sorting);    
    return fetchUrl(endpoints.character, params);
}