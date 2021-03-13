export declare type Validator = (value: string) => boolean;
export declare type Targets = {
    [propName: string]: string[];
};
export declare type Mirroring = {
    [propName: string]: number;
};
export default class ImageHistory {
    #private;
    get root(): Element;
    get mirroring(): {
        [x: string]: number;
    };
    get listener(): {
        [propName: string]: string[];
    };
    constructor(root: Element, targets?: Targets, filter?: Validator | Validator[] | false, defFilter?: boolean);
    all(): {
        image: string;
        type: 'inserted' | 'deleted';
    }[];
    inserted(): string[];
    deleted(): string[];
    statistics(): Mirroring;
    rebuild(): {
        [x: string]: number;
    };
    clear(): void;
    destory(): void;
    valid(img: string): boolean;
}
