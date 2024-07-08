export interface MainTemplate {
    title: string;
    meta: Record<string, string>[];
    link: Record<string, string>[];
    style: Record<string, string>[];
    script: Record<string, string>[];
    noscript: Record<string, string>[];
    bodyAttrs: Record<string, string>[];
    bodyScript: Record<string, string>[];
    body: string;
}