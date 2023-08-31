import { API_ENDPOINTS } from "../../../../../common/apis/apiEndpoints";

export function hitTranslationAPI({ from, to, inputText, signal }) {
    return fetch(API_ENDPOINTS.TRANSLATE, {
        method: 'POST',
        body: JSON.stringify({ q: inputText, source: from, target: to, format: 'text', api_key: '' }),
        headers: { 'Content-Type': 'application/json' },
        signal,
    }).catch((e) => {})
}
