export const FORMAT_GROUPS = {
    image: {
        label: "تصویر",
        formats: ["png", "jpg", "jpeg", "webp", "bmp", "gif", "ico", "tiff", "avif", "heic", "svg", "eps", "psd", "tga"],
        icon: "🖼️"
    },
    audio: {
        label: "صدا",
        formats: ["mp3", "wav", "ogg", "aac", "m4a", "flac", "wma", "opus", "amr", "mid", "aiff"],
        icon: "🎵"
    },
    video: {
        label: "ویدیو",
        formats: ["mp4", "webm", "mov", "avi", "mkv", "flv", "wmv", "3gp", "ts", "mpeg", "ogv"],
        icon: "🎬"
    },
    document: {
        label: "سند",
        formats: ["pdf", "txt", "docx", "doc", "rtf", "odt", "html", "md", "csv", "xls", "xlsx", "ppt", "pptx"],
        icon: "📄"
    },
    ebook: {
        label: "کتاب الکترونیک",
        formats: ["epub", "mobi", "azw3", "fb2", "lit"],
        icon: "📚"
    },
    archive: {
        label: "فشرده‌سازی",
        formats: ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"],
        icon: "📦"
    },
    code: {
        label: "برنامه‌نویسی",
        formats: ["js", "py", "java", "cpp", "json", "xml", "css", "ts", "php", "go", "rs"],
        icon: "💻"
    }
};

export function getPossibleTargets(sourceExt) {
    const ext = sourceExt.toLowerCase().replace('.', '');
    
    // Find which group the source belongs to
    let sourceGroupKey = null;
    for (const [key, group] of Object.entries(FORMAT_GROUPS)) {
        if (group.formats.includes(ext)) {
            sourceGroupKey = key;
            break;
        }
    }

    if (!sourceGroupKey) {
        // Fallback for unknown formats
        return ["pdf", "zip", "txt"];
    }

    // Logic: 
    // 1. Suggest everything in the same group
    // 2. Images can also go to PDF
    // 3. Documents can also go to PDF/TXT
    // 4. Everything can be zipped
    let targets = [...FORMAT_GROUPS[sourceGroupKey].formats];
    
    if (sourceGroupKey === 'image' || sourceGroupKey === 'document' || sourceGroupKey === 'code') {
        if (!targets.includes('pdf')) targets.push('pdf');
    }
    
    if (!targets.includes('zip')) targets.push('zip');

    // Remove current extension
    return targets.filter(f => f !== ext).sort();
}

export function getFormatIcon(ext) {
    ext = ext.toLowerCase().replace('.', '');
    for (const group of Object.values(FORMAT_GROUPS)) {
        if (group.formats.includes(ext)) return group.icon;
    }
    return "📄";
}