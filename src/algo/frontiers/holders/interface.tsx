export interface HolderInterface {
    push(item: any): void;
    pop(): any;
    peek(): any;
    isEmpty(): boolean;
    size(): number;
    items: any[];
}
