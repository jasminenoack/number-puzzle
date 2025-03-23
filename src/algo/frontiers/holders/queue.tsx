import { HolderInterface } from "./interface";

export class Queue implements HolderInterface {
    items: any[] = [];

    push(item: any): void {
        this.items.push(item);
    }

    pop(): any {
        const item = this.items.shift()
        return item;
    }

    peek(): any {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}
