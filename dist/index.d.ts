export declare type Validator = (value: string) => boolean;
export declare type Targets = {
    [propName: string]: string[];
};
export declare type Statistics = {
    [propName: string]: number;
};
export default class ImageHistory {
    #private;
    get root(): Element;
    get listener(): {
        [propName: string]: string[];
    };
    get primordial(): [string, number][];
    constructor(root: Element, targets?: Targets, filter?: Validator | Validator[] | false, defFilter?: boolean);
    statistics(): [string, number][];
    deleted(): string[];
    inserted(): string[];
    all(): {
        image: string;
        type: 'inserted' | 'deleted';
    }[];
    clear(): void;
    destory(): void;
    valid(img: string): boolean;
}
