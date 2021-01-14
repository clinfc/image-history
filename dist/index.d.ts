export default class ImageHistory {
    protected target: Element | null;
    private observer;
    private data;
    constructor(target: Element);
    deleted(): string[];
    inserted(): string[];
    all(): {
        src: string;
        type: string;
    }[];
    clear(): void;
    destory(): void;
}
