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
    
    let sourceGroupKey = null;
    for (const [key, group] of Object.entries(FORMAT_GROUPS)) {
        if (group.formats.includes(ext)) {
            sourceGroupKey = key;
            break;
        }
    }

    const nativeImages = ["png", "jpg", "jpeg", "webp"];
    const nativeDocs = ["pdf"];

    let recommended = [];
    let experimental = [];

    if (sourceGroupKey === 'image') {
        recommended = nativeImages.filter(f => f !== ext);
        recommended.push('pdf');
        experimental = FORMAT_GROUPS.image.formats.filter(f => !recommended.includes(f) && f !== ext);
    } else if (sourceGroupKey === 'document' || sourceGroupKey === 'code') {
        recommended = ['pdf', 'txt'];
        experimental = FORMAT_GROUPS[sourceGroupKey].formats.filter(f => !recommended.includes(f) && f !== ext);
    } else if (sourceGroupKey) {
        // For audio/video/etc
        recommended = FORMAT_GROUPS[sourceGroupKey].formats.slice(0, 3).filter(f => f !== ext);
        experimental = FORMAT_GROUPS[sourceGroupKey].formats.slice(3).filter(f => f !== ext);
    } else {
        recommended = ["pdf", "zip"];
    }

    // Always allow zipping as experimental/fallback
    if (!recommended.includes('zip') && !experimental.includes('zip')) {
        experimental.push('zip');
    }

    return {
        recommended: [...new Set(recommended)].sort(),
        experimental: [...new Set(experimental)].sort()
    };
}

export function getFormatIcon(ext) {
    ext = ext.toLowerCase().replace('.', '');
    for (const group of Object.values(FORMAT_GROUPS)) {
        if (group.formats.includes(ext)) return group.icon;
    }
    return "📄";
}