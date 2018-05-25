export default function downloadDocument(filename, data, mimeType) {
    // deliberate 'false', see below
    if (false && window.navigator.msSaveBlob) {
        let blob = new Blob([decodeURIComponent(data)], {type: `${mimeType};charset=utf8`});
        // Crashes in IE 10, IE 11 and Microsoft Edge
        // See MS Edge Issue #10396033
        // Hence, the deliberate 'false'
        // This is here just for completeness
        // Remove the 'false' at your own risk
        window.navigator.msSaveBlob(blob, filename);
    } else if (window.Blob && window.URL) { // HTML5 Blob        
        let blob = new Blob([data], {type: `${mimeType};charset=utf-8`});
        let dataUrl = URL.createObjectURL(blob);
        let ghostLink = document.createElement('a');
        ghostLink.setAttribute('download', filename);
        ghostLink.setAttribute('href', dataUrl);
        ghostLink.click();
    } else { // Data URI
        let dataUrl = `data:${mimeType};charset=utf-8,` + encodeURIComponent(data);
        let ghostLink = document.createElement('a');
        ghostLink.setAttribute("download", filename);
        ghostLink.setAttribute('href', dataUrl);
        ghostLink.setAttribute('target', '_blank');
        ghostLink.click();
    }
}